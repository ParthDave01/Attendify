const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please add subject name']
  },
  code: {
    type: String,
    required: [true, 'Please add subject code']
  },
  totalClasses: {
    type: Number,
    default: 60, // Assuming 60 classes per semester
    min: 1
  },
  attendedClasses: {
    type: Number,
    default: 0,
    min: 0
  },
  bunkedClasses: {
    type: Number,
    default: 0,
    min: 0
  },
  credits: {
    type: Number,
    default: 3
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Subject', SubjectSchema);