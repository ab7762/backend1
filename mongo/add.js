require('./dbconnection');

const Student = require('./models/Student');
const NewStudentObject = require('./NewStudentObject');
// eslint-disable-next-line new-cap
const newStudent = Student(NewStudentObject);

Student.create(newStudent)
  .then((doc) => {
    console.log('Document inserted succesfully' + doc);
  })
  .catch((err) => {
    console.error(err);
  });
