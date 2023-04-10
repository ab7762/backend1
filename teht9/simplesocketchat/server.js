/*Mahdollisiman yksinkertinen chatti Socket.io:lla
 * Socket.io:n toiminta perustuu eventteihin. Socket
 * perii Noden events.eventEmitter -luokan  joten se
 * voi emittoida eventtejä.
 *
 * Projektiin tarvitsee asentaa vain yksi kirjasto: socket.io
 * Serveri käynnistyy komennolla node server ja clientit ovat
 * osoitteissa http://localhost:3010/client.html
 */

const http = require('http');
const fs = require('fs');
const Moniker = require('moniker');

// Luo käyttäjän
const addUser = function () {
  const user = Moniker.choose();
  return user;
};
//http-serveri joka laitetaan muuttujaan app servaa sivun client.html

const app = http
  .createServer((req, res) => {
    fs.readFile('client.html', 'utf-8', (error, data) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  })
  .listen(3010);
console.log('Http server in port 3010');

//Socket-serveri io luodaan ja liitetään http-serveriin app
const io = require('socket.io')(app);
const luku = Math.floor(Math.random() * 100) + 1;
console.log(luku);
/*'connection'-tapahtuma suoritetaan joka kerta kun joku clientin 
socket ottaa yhteyden serveriin. Parametrina oleva muuttuja socket on 
viittaus clientin socketiin
*/
io.sockets.on('connection', (socket) => {
  const user = addUser();
  socket.emit('welcome', user);
  // kun clientilta tulee 'message to server' -tapahtuma saadaan clientilta data
  // data -muuttuja on olio joka sisältää on avain-arvo-pareja, indeksinä avaimet
  socket.on('message_to_server', (data) => {
    console.log(data);
    console.log(luku);
    if (data.value < luku) {
      // lähetetään tullut data takaisin kaikille clientin socketeille
      // emitoimalla tapahtuma 'message_to_client'.
      io.sockets.emit('pieni', data);
      return true;
    }
    if (data.value > luku) {
      // lähetetään tullut data takaisin kaikille clientin socketeille
      // emitoimalla tapahtuma 'message_to_client'.
      io.sockets.emit('suuri', data);
      return true;
    } else {
      io.sockets.emit('voitto', data);
      return true;
    }
  });
});
