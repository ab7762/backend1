const conn = require('./dbconnection');

const Dbmethods = {
  /* Olion sisällä olevassa metodissa ei tarvita function-avainsanaa.
    callback on anonyymi funktio jolla käsitellään kyselyn tulos. Se luodaan
    tiedostoon jossa tämä metodi suoritetaan (add.js)*/

  add: function (studentcode, name, email, studypoints, callback) {
    return conn.query(
      'insert into Students set studentcode = ?, name = ?, email = ?, studypoints = ?',
      [studentcode, name, email, studypoints],
      callback
    );
  },
  // Tee tähän muut metodit

  // Hakee kaikki Students
  findAll: function (callback) {
    return conn.query('select * from Students', callback);
  },

  // Hakee kaikki opiskelijat, joiden pisteet on alle points
  findBelLimit: function (points, callback) {
    return conn.query(
      `select * from Students WHERE studypoints < ${points}`,
      callback
    );
  },
  // Poistaa opiskelijan studentcoden perusteella
  del: function (studentcode, callback) {
    this.delGrades(studentcode);
    return conn.query(
      `DELETE from Students WHERE studentcode = ? `,
      [studentcode],
      callback
    );
  },
  // Poistaa arvosanan studentcoden perusteella
  delGrades: function (studentcode, callback) {
    return conn.query(
      `DELETE FROM Grades WHERE studentcode = ?`,
      [studentcode],
      callback
    );
  },
  // Päivittää studentcoden perusteella pisteitä
  updatePoints: function (studentcode, points, callback) {
    return conn.query(
      'UPDATE Students  SET studypoints= ?  WHERE studentcode = ?',
      [points, studentcode],
      callback
    );
  },
  //Päivittää arvosanan studentcoden ja coursecoden perusteella
  updateGrade: function (studentcode, coursecode, grade, callback) {
    return conn.query(
      'UPDATE Grades SET grade=? WHERE studentcode=? AND coursecode=?',
      [grade, studentcode, coursecode],
      callback
    );
  },

  // Lisää uuden arvosanan. Jos arvosana on yli 0 (hyväksytty), tekee transaktion ja lisää myös opintopisteitä
  addGrade: function (studentcode, coursecode, grade, callback) {
    if (grade > 0) {
      conn.beginTransaction(function (err) {
        if (err) {
          throw err;
        }
        conn.query(
          'INSERT INTO Grades SET studentcode=?, coursecode= ?,grade=?',
          [studentcode, coursecode, grade],
          function (error, results, fields) {
            if (error) {
              return conn.rollback(function () {
                throw error;
              });
            }

            conn.query(
              ' UPDATE Students log SET studypoints= studypoints + 5 WHERE studentcode = ?    ',
              [studentcode, grade],
              function (error, results, fields) {
                if (error) {
                  return conn.rollback(function () {
                    throw error;
                  });
                }
                conn.commit(function (err) {
                  if (err) {
                    return conn.rollback(function () {
                      throw err;
                    });
                  }
                  console.log('Grade added and Student updated');
                });
              }
            );
          }
        );
      });
    } else {
      conn.query(
        'INSERT INTO Grades SET studentcode=?, coursecode= ?,grade=?',
        [studentcode, coursecode, grade],
        function (error, results, fields) {
          if (error) {
            return conn.rollback(function () {
              throw error;
            });
          }
          console.log('Grade added');
        }
      );
    }
  },
};
module.exports = Dbmethods;
