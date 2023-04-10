const Dbmethods = require('./Dbmethods');

function handleError(err) {
  console.error(err);
  process.exit(1);
}

Dbmethods.updatePoints('x1234', 210, function (err, result) {
  if (err) {
    return handleError(err);
  }
  console.log(result.affectedRows + ' records updated');
});
