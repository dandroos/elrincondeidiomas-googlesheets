const Spreadsheet = require('google-spreadsheet');
const creds = require('./client_secret.json')
const app = require('./app')
const colors = require('colors')

const doc = new Spreadsheet('1gyuDDAeSocdMyIGxKoRZEkk-WlVkC68I_93xrJw80Ws')

console.clear();

// Create payment cycle
doc.useServiceAccountAuth(creds, (err) => {
    if (err) console.error(err);
    app(doc);
})




//PLAYGROUND
