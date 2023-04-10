require('./dbconnection');

const Student = require('./models/Student');
const newgrade = {
  coursecode: 'HIE14900',
  grade: 5,
};
// Lisää arvosanan ja lisää opintopisteitä studentcoden perusteella.
Student.updateOne(
  { studentcode: 'x1534' },
  { $push: { grades: newgrade }, $inc: { studypoints: 5 } },
  (err, obj) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Grade' + ' ' + 'added');
    }
  }
);
