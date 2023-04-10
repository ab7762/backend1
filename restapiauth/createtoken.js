const jwt = require('jsonwebtoken');
// Tokenin luontifunktio
function createToken(user) {
  const payload = {
    username: user.username,
    isadmin: user.isadmin,
  };
  console.log(payload);
  const token = jwt.sign(payload, process.env.Secret, {
    expiresIn: 60 * 60 * 24,
    // voimassa 24h
  });
  return token;
}
module.exports = createToken;
