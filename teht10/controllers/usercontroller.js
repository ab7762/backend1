const bcrypt = require('bcryptjs');
const User = require('../models/Users');
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
          return res
            .status(500)
            .send('KÃ¤yttÃ¤jÃ¤n rekisterÃ¶inti epÃ¤onnistui.');
        } else {
          const token = createToken(user); // tokenin luontimetodi
          // palautetaan token JSON-muodossa
          res.json({
            success: true,
            message: 'TÃ¤ssÃ¤ on valmis Token!',
            token: token,
          });
        }
      }
    );
  },
  // olemassa olevan kÃ¤yttÃ¤jÃ¤n autentikaatio
  // jos autentikaatio onnistuu, kÃ¤yttÃ¤jÃ¤lle luodaan token
  authenticateUser: function (req, res, next) {
    // etsitÃ¤Ã¤n kÃ¤yttÃ¤jÃ¤ kannasta http-pyynnÃ¶stÃ¤ saadun kÃ¤yttÃ¤jÃ¤tunnuksen perusteella
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
          // verrataan lomakkeelle syÃ¶tettyÃ¤ salasanaa kannassa olevaan salasanaan
          // jos vertailtavat eivÃ¤t ole samat, palautetaan tieto siitÃ¤ ettÃ¤ salasana oli vÃ¤Ã¤rÃ¤
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
              message: 'TÄSSÄ on valmis Token!',
              token: token,
            });
          }
        }
      }
    );
  },
};
module.exports = UserController;
