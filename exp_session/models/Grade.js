const mongoose = require('mongoose');

const GradeSchema = new mongoose.Schema({
  coursecode: {
    type: String,
    required: true,
    max: 10,
  },
  grade: { type: Number, min: 0, max: 5 },
});

module.exports = GradeSchema;
