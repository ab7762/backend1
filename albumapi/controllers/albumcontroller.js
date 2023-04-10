const Album = require('../models/Album'); // haetaan Album-model
// Tähän olioon tulee kaikki Album-modeliin liittyvät metodit
const AlbumController = {
  // findAll hakee kaikki albumit tietokannasta
  findAll: (req, res) => {
    Album.find((error, albums) => {
      if (error) {
        throw error;
      }
      res.json(albums);
    });
  },
  // Haku albumikoodin perusteella
  findByCode: (req, res) => {
    Album.findOne({ albumcode: req.params.id }, (err, album) => {
      if (err) {
        throw err;
      }
      res.json(album);
    });
  },
  // Haku albumin nimen perusteella
  findByName: (req, res) => {
    Album.find({ title: req.params.id }, (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  },

  // Haku tietyn artistin albumeista
  findByArtist: (req, res) => {
    Album.find({ artist: req.params.id }, (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  },
  // Haku tietyn vuoden albumeista
  findByYear: (req, res) => {
    Album.find({ year: req.params.id }, (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
  },
  // Haku kahden vuoden väliltä
  findBetweenYears: (req, res) => {
    Album.find(
      {
        $and: [
          { year: { $gte: req.params.y } },
          { year: { $lte: req.params.yy } },
        ],
      },
      (err, result) => {
        if (err) {
          throw err;
        }
        res.json(result);
      }
    );
  },
  // Albumin muokkaus albumikoodin perusteella
  updateAlbum: (req, res) => {
    Album.findOneAndUpdate({ albumcode: req.params.id }, { $set: req.body })
      .then((result) => {
        console.log('document updated succesfully: ' + res);
        res.json(result);
      })
      .catch((err) => {
        console.error(err);
      });
  },
  // Kappaleen päivitys trackcoden perusteella
  updateSong: (req, res) => {
    Album.findOneAndUpdate(
      {
        albumcode: req.params.ac,
        'tracks.trackcode': req.params.tc,
      },

      {
        $set: { 'tracks.$': req.body },
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
  // Uuden albumin lisäys tietokantaan
  add: (req, res) => {
    // eslint-disable-next-line new-cap
    const newAlbum = Album(req.body);
    Album.create(newAlbum)
      .then((doc) => {
        console.log('document inserted succesfully: ' + doc);
        res.json(doc);
      })
      .catch((err) => {
        let errMsg;
        if (err.code == 11000) {
          errMsg = Object.keys(err.keyValue)[0] + ' already exists.';
        } else {
          errMsg = err.message;
        }
        res.status(400).json({ statusText: 'Bad Request', message: errMsg });
      });
  },
  // Albumin poisto albumcoden perusteella
  delete: (req, res) => {
    Album.findOneAndDelete({ albumcode: req.params.id }, (err, result) => {
      if (err) {
        throw err;
      }
      console.log('deleted succesfully');
      res.json(result);
    });
  },
  // Kappaleen poisto albumista albumin id:n sekä kappaleen id:n perusteella
  deleteSong: (req, res) => {
    Album.findOneAndUpdate(
      { _id: req.params.ac },
      {
        $pull: {
          tracks: {
            _id: req.params.tc,
          },
        },
      },
      (err, result) => {
        if (err) {
          throw err;
        }
        console.log('deleted succesfully');
        res.json(result);
      }
    );
  },
  // Kappaleen lisäys albumiin albumcoden perusteella.
  addSong: (req, res) => {
    const newAlbum = Album(req.body);
    Album.findOneAndUpdate(
      { albumcode: req.params.id },
      {
        $push: {
          tracks: req.body,
        },
      },
      (err, result) => {
        if (err) {
          console.log(err);
        }
        console.log('inserted succesfully');
        res.json(result);
      }
    );
  },
};
module.exports = AlbumController;
