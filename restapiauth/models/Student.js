const mongoose = require('mongoose');
const GradeSchema = require('./Grade');

const StudentSchema = new mongoose.Schema(
  {
    studentcode: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-z]{1}[0-9]{4}$/,
    },
    name: { type: String, required: true, max: 80 },
    email: { type: String, required: true },
    studypoints: { type: Number, min: 0, max: 300 },
    grades: { type: [GradeSchema], required: true },
  },
  {
    versionKey: false,
  }
);

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
