const express = require('express'); // Otetaan express käyttöön
const authorize = require('../verifytoken'); // Authorize varmistaa, että token on voimassa
const router = express.Router(); // Otetaan reititys käyttöön
const album = require('../controllers/albumcontroller'); // Haetaan album-metodit

// Reititetään albumcontrollerin metodeja
// Haetaan kaikki
router.get('/', album.findAll);
// Haku albumikoodilla
router.get('/:id', album.findByCode);
// Haku albumin nimellä
router.get('/findbyname/:id', album.findByName);
// Hakee tietyn vuoden albumit
router.get('/findbyyear/:id', album.findByYear);
// Hakee artistin perusteella
router.get('/artist/:id', album.findByArtist);
// Haku kahden vuoden väliltä
router.get('/:y/:yy', album.findBetweenYears);
// Albumin muokkaus albumcoden perusteella
router.put('/:id', authorize, album.updateAlbum);
// Yhden kappaleen muokkaus albumcoden ja trackcoden perusteella
router.put('/updatesong/:ac/:tc', authorize, album.updateSong);
// Uuden albumin lisäys
router.post('/', authorize, album.add);
// Albumin poisto albumcoden perusteella
router.delete('/delete/:id', authorize, album.delete);
// Yhden kappaleen poisto albumin id:n ja kappaleen id:n perusteella
router.put('/deletesong/:ac/:tc', authorize, album.deleteSong);
// Lisätään kappale albumiin albumcoden perusteella
router.put('/addsong/:id', authorize, album.addSong);
module.exports = router;
