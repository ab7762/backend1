require('./dbconnection');
const student = require('./models/Student');
// Poistetaan annettu studentcode ja perään callback
student.deleteOne({ studentcode: 'h1234' }, (err, obj) => {
  if (err) {
    console.error(err);
  } else {
    console.log(obj.deletedCount + ' ' + 'poistettu');
  }
});
