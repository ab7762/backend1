/* eslint-disable new-cap */

/* MONGOOSE -ESIMERKKI
 *
 * Tiedon tallennus, haku, muokkaus ja poisto Mongoosen avulla. Huomaa, että toimenpiteiden
 * koodeja ei ole laitettu funktioiden sisään, vaan toimenpiteet suoritetaan heti kun tiedosto ajetaan.
 *
 * Mongoose on kirjasto joka tarjoaa helppokäyttöisemmän rajapinnan MongoDB:n käsittelyyn.
 * Mongoose käyttää kannan käsittelyyn omia metodejaan jotka ovat hieman eri nimisiä kuin
 * MongoDB:n varsinaiset metodit. Mongoose tarjoaa tiedolle myös skeeman joka voidaan
 * määritellä tarkasti.
 *
 * Mongoose on ODM-työkalu (Object Document Modeling) joka on dokumenttikannalle
 * sama asia kuin ORM relaatiotietokannalle
 *
 * Mongoosen periaatteena on että luodaan skeema eli esitysmuoto joka tallennetaan
 * malliksi (model). Mongoosen CRUD-metodit kohdistetaan modeliin. Mongodb-tietokanta ei
 * sisällä mitään skeemaa, joka pakottaisi kantaan tallennettavan datan tietyn muotoiseksi,
 * joten Mongoose lisää sovelluksen toimintavarmuutta ja turvallisuutta.
 *
 * Mongoosen skeemat voivat olla myös hierarkisia (alidokumentit) ja niiden välillä
 * voi olla assosiaatioita.
 *
 * Tässä esimerkissä kannan tiedot ovat piilotettuina .env -tiedostoon, mikä on
 * tietoturvan kannalta parempi kuin se että ne olisivat koodissa.
 *
 */

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
require('dotenv').config(); //dotenv -moduuli tarvitaan jos aiotaan käyttää .env -filua

// yhteydenotto Docker-kontissa sijaitsevaan kantaan, MONGODB_URL on .env tiedostossa:
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true, // optioita eli konffimäärityksiä
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connection successful');
  })
  .catch((err) => {
    console.error('Database connection error: ' + err);
  });

//mongoose-skeema Tasks määrittelee millainen on Task
const Taskschema = new mongoose.Schema({
  project: String,
  description: String,
});
// Skeemasta pitää tehdä model, jonka kautta tietokantaa käsitellään, koska
// kantaa käsitellään modelin metodeilla

//skeemasta tehdään model nimeltään Task. Model on luokka joka sisältää skeeman.
const Task = mongoose.model('Task', Taskschema);

//----------TALLENNUS-------------------------------//

//tallennettava tieto oliona
const newTaskObject = {
  project: 'Project1',
  description: 'Do exercise 1',
};

newTask = Task(newTaskObject); //Tehdään newTaskObject -oliosta Task-tyyppinen

//Olion tallennus Mongoosen create -metodilla.

Task.create(newTask, function (err) {
  if (err) {
    throw err;
  }
  console.log('Task created.');
});


//----------HAKU-------------------------------//

// Taskin haku Task-modelin find -metodilla project -avaimen arvon perusteella.
// Haku on nopeampi kuin tallennus, joten se tapahtuu ennen tallennusta jos ne ajetaan samaan aikaan.
/*
Task.find(
  {
    project: 'Project1',
  },
  function (err, tasks) {
    if (err) {
      throw err;
    }
    // console.log(tasks); //katsotaan millainen on tasks -taulukko
    tasks.forEach(function (task) {
      console.log(task.description);
    });
  }
);
*/
//----------MUOKKAUS-------------------------------//
// Muokkaus tapahtuu modelin kautta. updateOne päivittää yhden dokumentin
/*
Task.updateOne(
  { project: 'Project1' }, // voitaisiin tehdä myös _id:n perusteella:  { _id: tähän dokumentin _id }
  { description: 'Do the new excersise' },
  function (err, rowsUpdated) {
    if (err) {
      throw err;
    }
    //console.log(rowsUpdated); //katsotaan millainen on rowsUpdated -olio
    console.log(rowsUpdated.n + ' rows updated.');
  }
);
*/
//----------POISTO-------------------------------//

/*
Task.deleteOne(
  {
    project: 'Project1',
  },
  function (err) {
    if (err) {
      throw err;
    }
    console.log('Task deleted.');
  }
);
*/

// Kaikissa metodeissa voidaan käyttää callbackin sijasta myös promisea
// Tässä tapauksessa ei näytä juurikaan callbackia selkeämmältä:
/*
Task.deleteOne({
  project: 'Project1',
})
  .then(function () {
    console.log('Task deleted');
  })
  .catch(function (err) {
    throw err;
  });
*/
