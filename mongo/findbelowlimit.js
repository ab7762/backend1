require('./dbconnection');
const Student = require('./models/Student');
const raja = 100;
Student.find({ studypoints: { $lt: raja } }, (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log(res);
  }
});
/*
{
  "albumcode": "0003",
  "title": "Viimeinen tentti",
  "year": 2022,
  "artist": "Mikko Kivelä",
  "format": "single",
  "publisher": "Mikon levyt",
  "tracks": [
      {
          "trackcode": "4455",
          "title": "Viimeinen tentti",
          "lenght": "02:37",
          "composition": ["Mikko Kivelä"],
          "lyrics": ["Mikko Kivelä"],
          "arrangement": ["Mikko Kivelä, Teppo Winnipeg"],
          "producer": ["Leri Lheskinen"]
      }
  ]

} */
