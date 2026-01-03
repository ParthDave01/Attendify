const express = require('express');
const Subject = require('../models/Subject');
const Timetable = require('../models/Timetable');
const router = express.Router();
const { protect } = require('../middleware/auth');

// @desc    Get all subjects for a user
// @route   GET /api/subjects
router.get('/', protect, async (req, res) => {
  try {
    const subjects = await Subject.find({ user: req.user.id });
    
    // Calculate bunk information for each subject
    const subjectsWithBunkInfo = subjects.map(subject => {
      const requiredClasses = Math.ceil((req.user.targetAttendance / 100) * subject.totalClasses);
      const maxBunkable = subject.totalClasses - requiredClasses - subject.bunkedClasses;
      
      return {
        ...subject.toObject(),
        bunkInfo: {
          currentPercentage: ((subject.attendedClasses / subject.totalClasses) * 100).toFixed(2),
          requiredClasses,
          maxBunkable,
          status: maxBunkable > 0 ? 'safe' : 'critical'
        }
      };
    });
    
    res.status(200).json({
      success: true,
      count: subjectsWithBunkInfo.length,
      data: subjectsWithBunkInfo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Create a subject
// @route   POST /api/subjects
router.post('/', protect, async (req, res) => {
  try {
    req.body.user = req.user.id;
    const subject = await Subject.create(req.body);
    
    res.status(201).json({
      success: true,
      data: subject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Update subject attendance
// @route   PUT /api/subjects/:id/attendance
router.put('/:id/attendance', protect, async (req, res) => {
  try {
    const { action } = req.body; // 'attend' or 'bunk'
    const subject = await Subject.findById(req.params.id);
    
    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found'
      });
    }
    
    // Check ownership
    if (subject.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }
    
    // Update attendance
    if (action === 'attend') {
      subject.attendedClasses += 1;
    } else if (action === 'bunk') {
      subject.bunkedClasses += 1;
    }
    
    await subject.save();
    
    // Calculate updated bunk info
    const requiredClasses = Math.ceil((req.user.targetAttendance / 100) * subject.totalClasses);
    const maxBunkable = subject.totalClasses - requiredClasses - subject.bunkedClasses;
    
    res.status(200).json({
      success: true,
      data: {
        ...subject.toObject(),
        bunkInfo: {
          currentPercentage: ((subject.attendedClasses / subject.totalClasses) * 100).toFixed(2),
          requiredClasses,
          maxBunkable,
          status: maxBunkable > 0 ? 'safe' : 'critical'
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @desc    Get overall attendance summary
// @route   GET /api/subjects/summary
router.get('/summary', protect, async (req, res) => {
  try {
    const subjects = await Subject.find({ user: req.user.id });
    
    let totalClassesAll = 0;
    let totalAttendedAll = 0;
    let totalBunkedAll = 0;
    
    subjects.forEach(subject => {
      totalClassesAll += subject.totalClasses;
      totalAttendedAll += subject.attendedClasses;
      totalBunkedAll += subject.bunkedClasses;
    });
    
    const currentOverallPercentage = totalClassesAll > 0 
      ? (totalAttendedAll / totalClassesAll) * 100 
      : 0;
    
    const requiredOverall = Math.ceil((req.user.targetAttendance / 100) * totalClassesAll);
    const overallBunkable = totalClassesAll - requiredOverall - totalBunkedAll;
    
    res.status(200).json({
      success: true,
      data: {
        overallPercentage: currentOverallPercentage.toFixed(2),
        targetPercentage: req.user.targetAttendance,
        totalClasses: totalClassesAll,
        totalAttended: totalAttendedAll,
        totalBunked: totalBunkedAll,
        overallBunkable: overallBunkable,
        status: currentOverallPercentage >= req.user.targetAttendance ? 'on-track' : 'needs-improvement'
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;