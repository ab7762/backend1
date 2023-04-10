const mongoose = require('mongoose');
const SongSchema = require('./Song');
// Schema albumille. Määritetään, mitä collectioniin voi laittaa ja mitä vaatimuksia tiedolle on
const AlbumSchema = new mongoose.Schema(
  {
    albumcode: {
      type: String,
      required: true,
      unique: true,
      min: 4,
    },
    title: { type: String, required: true },
    year: { type: Number, required: true },
    artist: { type: String, max: 200 },
    genre: { type: [String], required: false },
    format: { type: String, required: true },
    publisher: { type: String, required: true },
    tracks: { type: [SongSchema], required: true },
  },
  {
    versionKey: false,
  }
);

const Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;
