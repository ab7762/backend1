const bcrypt = require('bcryptjs');
const User = require('../models/User');
const createToken = require('../createtoken');

const UserController = {
  registerUser: function (req, res, next) {
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);

    User.create(
      {
        username: req.body.username,
        password: hashedPassword,
        isadmin: req.body.isadmin,
      },

      (err, user) => {
        if (err) {
          return res.status(500).send('Käyttäjän rekisteröinti epäonnistui');
        } else {
          const token = createToken(user); // tokenin luontimetodi
          // palautetaan token JSON-muodossa
          res.json({
            success: true,
            message: 'Token!',
            token: token,
          });
        }
      }
    );
  },
  // Jo olemassa olevan käyttäjän autentikointi.
  // Jos tunnus / salasana löytyy, palautetaan token.
  authenticateUser: function (req, res, next) {
    User.findOne(
      {
        username: req.body.username,
      },
      function (err, user) {
        if (err) {
          throw err;
        }
        if (!user) {
          res.json({
            success: false,
            message: 'Autentikaatio epäonnistui, käyttäjää ei ole.',
          });
        } else if (user) {
          // console.log(req.body.password); // lomakkelle syÃ¶tetty salasana
          // console.log(user.password); // kannassa oleva salasana
          // Verrataan annettua salasanaa ja kannan salasanaa
          // Jos tiedot ei täsmää, palautetaan false ja viesti.
          if (bcrypt.compareSync(req.body.password, user.password) === false) {
            res.json({
              success: false,
              message: 'Autentikaatio epäonnistui, väärä salasana.',
            });
          } else {
            // jos salasanat ovat samat, luodaan token
            const token = createToken(user); // tokenin luontimetodi
            // palautetaan token JSON-muodossa
            res.json({
              success: true,
              message: 'Token',
              token: token,
            });
          }
        }
      }
    );
  },
};
module.exports = UserController;
