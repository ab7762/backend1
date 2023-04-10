const Dbmethods = require('./Dbmethods');

function handleError(err) {
  console.error(err);
  process.exit(1);
}

Dbmethods.updateGrade('x1234', 'hh-1230', 5, function (err, result) {
  if (err) {
    return handleError(err);
  }
  console.log(result.affectedRows + ' records updated');
});
