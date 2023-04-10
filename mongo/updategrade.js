require('./dbconnection');

const Student = require('./models/Student');
// Muokkaa opiskelijan kurssin arvosanaa studentcoden ja coursecoden perusteella
Student.findOneAndUpdate(
  { $and: [{ studentcode: 'x1534' }, { 'grades.coursecode': 'HTS600' }] },
  { 'grades.$.grade': 4 },

  (err, obj) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Document' + ' ' + 'updated');
    }
  }
);
