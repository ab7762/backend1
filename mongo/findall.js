require('./dbconnection');
const Student = require('./models/Student');

Student.find({}, (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log(res);
  }
});
