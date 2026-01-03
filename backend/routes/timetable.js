const express = require('express');
const router = express.Router();
const Timetable = require('../models/Timetable');
const authMiddleware = require('../middleware/authMiddleware');

// @desc    Get user's timetable
// @route   GET /api/timetable
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const timetable = await Timetable.findOne({ user: req.user.id }).populate('user', 'name email');
    
    if (!timetable) {
      return res.status(404).json({
        success: false,
        message: 'No timetable found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: timetable
    });
  } catch (error) {
    console.error('Error fetching timetable:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Create or update timetable
// @route   POST /api/timetable
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { classes } = req.body;
    
    // Validate classes array
    if (!Array.isArray(classes)) {
      return res.status(400).json({
        success: false,
        message: 'Classes must be an array'
      });
    }
    
    // Validate each class
    for (let i = 0; i < classes.length; i++) {
      const cls = classes[i];
      if (!cls.subjectName || !cls.day || !cls.startTime || !cls.endTime || !cls.classType) {
        return res.status(400).json({
          success: false,
          message: `Missing required fields for class ${i + 1}`
        });
      }
    }
    
    // Check if timetable exists
    let timetable = await Timetable.findOne({ user: req.user.id });
    
    if (timetable) {
      // Update existing timetable
      timetable.classes = classes;
      timetable.lastUpdated = Date.now();
    } else {
      // Create new timetable
      timetable = new Timetable({
        user: req.user.id,
        classes,
        lastUpdated: Date.now()
      });
    }
    
    await timetable.save();
    
    res.status(200).json({
      success: true,
      message: 'Timetable saved successfully',
      data: timetable
    });
  } catch (error) {
    console.error('Error saving timetable:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Delete a class from timetable
// @route   DELETE /api/timetable/class/:classId
// @access  Private
router.delete('/class/:classId', protect, async (req, res) => {
  try {
    const timetable = await Timetable.findOne({ user: req.user.id });
    
    if (!timetable) {
      return res.status(404).json({
        success: false,
        message: 'Timetable not found'
      });
    }
    
    // Find and remove the class
    const classIndex = timetable.classes.findIndex(
      cls => cls._id.toString() === req.params.classId
    );
    
    if (classIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }
    
    timetable.classes.splice(classIndex, 1);
    timetable.lastUpdated = Date.now();
    await timetable.save();
    
    res.status(200).json({
      success: true,
      message: 'Class deleted successfully',
      data: timetable
    });
  } catch (error) {
    console.error('Error deleting class:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @desc    Clear entire timetable
// @route   DELETE /api/timetable
// @access  Private
router.delete('/', protect, async (req, res) => {
  try {
    const timetable = await Timetable.findOneAndDelete({ user: req.user.id });
    
    if (!timetable) {
      return res.status(404).json({
        success: false,
        message: 'Timetable not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Timetable cleared successfully'
    });
  } catch (error) {
    console.error('Error clearing timetable:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;