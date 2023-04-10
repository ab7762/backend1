require('./dbconnection');

const Student = require('./models/Student');

Student.updateOne(
  { studentcode: 'h1234' },
  { studypoints: 200 },
  (err, obj) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Document' + ' ' + 'updated');
    }
  }
);
