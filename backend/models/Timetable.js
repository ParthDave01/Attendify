const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
  subjectName: {
    type: String,
    required: [true, 'Please add subject name'],
    trim: true
  },
  subjectCode: {
    type: String,
    trim: true
  },
  day: {
    type: String,
    required: true,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  },
  startTime: {
    type: String,
    required: true,
    match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/ // HH:MM format
  },
  endTime: {
    type: String,
    required: true,
    match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
  },
  classType: {
    type: String,
    required: true,
    enum: ['Lecture', 'Lab', 'Tutorial']
  },
  credits: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    default: 3
  },
  venue: {
    type: String,
    trim: true
  },
  instructor: {
    type: String,
    trim: true
  }
});

const TimetableSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // Each user has one timetable
  },
  classes: [ClassSchema], // Array of classes
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Timetable', TimetableSchema);