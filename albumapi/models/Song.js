const mongoose = require('mongoose');

const TrackSchema = new mongoose.Schema({
  trackcode: {
    type: String,
    required: true,
    max: 10,
    unique: [true, 'Trackcode on käytössä'],
  },
  title: { type: String, max: 100 },
  length: { type: String, match: /^[0-9]{2}:[0-9]{2}$/, required: true },
  composition: { type: [String] },
  lyrics: { type: [String] },
  arrangement: { type: [String] },
  producer: { type: [String] },
});

module.exports = TrackSchema;
