
// IMPORTS SERVER
const express = require('express')
var bodyParser = require('body-parser');
var crypto = require('crypto')

var fs = require('fs');


// import OPGP Handler
var opgpHandler = require('./opgpHandler')

// Server Setup
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Lock Setup
var padlockEtherium = require('./lockEtherium')
var token_id;
var filename = "id.txt"

//Read token_id
if (fs.exists(filename)) {

    fs.readFile(filename, 'utf8', function (err, data) {
        if (err) throw err;
        console.log('OK: ' + filename);
        token_id = data.replace(" ", "").replace("\n", "");
    });
} else {
    //If factory setting, create token
    var id;
    crypto.randomBytes(256, function (err, buffer) {
        id = buffer.toString('hex');
    });
    var created_successfully = false;
    created_successfully = createToken(id);

    while (created_successfully == false) {
        crypto.randomBytes(256, function (err, buffer) {
            id = buffer.toString('hex');
        });
        created_successfully = createToken(id);
    }

    fs.writeFile("id.txt", id, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}



app.get('/', function (req, res) {
    res.send(
        `Hello you!
      use Post on /unlock with message attribute
      `

    )
})

app.post("/unlock", function (req, res) {
    // check values okay

    if (opgpHandler.verifySignature(req.body.message)) {
        res.status(202).send("Message accepted.")
    } else {
        res.status(423).send("Message NOT accepted.")
    }

})

console.log("Starting Server on ", 3000)
app.listen(3000)