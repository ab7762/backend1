/*
Kontrolleri on olio, joka sisältää metodeja. Se tehty siksi, että
saadaan erotettua reitit ja tietokantahakujen sovelluslogiikka toisistaan.
Se on siis arkkitehtuuriratkaisu. Eli saamme aikaan järkevämmän arkkitehtuurin
kun jaamme eri asioita tekevän koodin eri tiedostoihin ja kansioihin.
*/

const Student = require('../models/Student'); // haetaan model

// Tietokannan käsittelymetodit tehdään olion sisään
// metodin nimi on avain ja sen runko on arvo
const StudentController = {
  /* findAll -metodi hakee kaikki opiskelijat
  Student-modelin find-metodilla */
  findAll: (req, res) => {
    Student.find((error, students) => {
      if (error) {
        throw error;
      }
      res.json(students);
    });
  },
  // Haetaan opiskelijat, joiden studypoints on pienempi kuin annettu arvo
  findBelowLimit: (req, res) => {
    Student.find({ studypoints: { $lt: req.params.id } }, (error, students) => {
      if (error) {
        throw error;
      }

      res.json(students);
    });
  },
  //Haku id:n perusteella
  findById: (req, res) => {
    Student.findOne({ _id: req.params.id }, (err, student) => {
      if (err) {
        throw err;
      }
      res.json(student);
    });
  },
  //Haku opiskelijatunnuksen perusteella
  findByStudentcode: (req, res) => {
    Student.findOne({ studentcode: req.params.id }, (err, student) => {
      if (err) {
        throw err;
      }

      res.json(student);
    });
  },
  //Haetaan tietyn kurssin opiskelijat
  findByCourse: (req, res) => {
    Student.find(
      { 'grades.coursecode': req.params.id },
      { name: 1, _id: 0 },
      (err, student) => {
        if (err) {
          throw err;
        }

        res.json(student);
      }
    );
  },
  // Opiskelijan lisäys
  add: (req, res) => {
    // eslint-disable-next-line new-cap
    const newStudent = Student(req.body);
    Student.create(newStudent)
      .then((doc) => {
        console.log('document inserted succesfully: ' + doc);
        res.json(doc);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  //Arvosanan ja opintopisteiden lisäys
  addGrade: (req, res) => {
    Student.updateOne(
      { studentcode: req.params.id },
      { $push: { grades: req.body }, $inc: { studypoints: 5 } },
      (err, doc) => {
        if (err) {
          console.error(err);
        } else {
          console.log(req.params.id);
          console.log('Grade' + ' ' + 'added');
          res.json(doc);
        }
      }
    );
  },
  // Opiskelijan poisto tunnuksen perusteella
  delete: (req, res) => {
    Student.findByIdAndDelete(req.params.id, (err, student) => {
      if (err) {
        throw err;
      }
      console.log(student.deletedCount + ' ' + 'deleted succesfully');
      res.json(student);
    });
  },
  // Opiskelijan muokkaus id:n perusteella
  updateStudent: (req, res) => {
    Student.findByIdAndUpdate(req.params.id, req.body)
      .then((result) => {
        console.log('document updated succesfully: ' + res);
        res.json(result);
      })
      .catch((err) => {
        console.error(err);
      });
  },

  // Opiskelijan tunnuksen ja kurssitunnuksen perusteella päivitetään kurssin arvosanaa
  updateGrade: (req, res) => {
    Student.findOneAndUpdate(
      {
        // eslint-disable-next-line quote-props
        studentcode: req.params.scode,
        'grades.coursecode': req.params.ccode,
      },

      {
        $set: { 'grades.$.grade': req.body.grade },
      }
    )
      .then((result) => {
        console.log('document updated succesfully: ' + res);
        res.json(result);
      })
      .catch((err) => {
        console.error(err);
      });
  },
};

module.exports = StudentController;

/*
students.js -reittitiedostossa kontrollerin metodia kutsutaan tällä tavalla:

router.get('/', StudentController.findAll);

jolloin kaikki opiskelijat saadaan JSON-muodossa osoitteesta http://localhost:3000/students/


*/
