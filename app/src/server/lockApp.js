
// IMPORTS SERVER
const express = require('express')
var bodyParser = require('body-parser');
var crypto = require('crypto')

const config = require("./configHandler")


// import OPGP Handler
var opgpHandler = require('./opgpHandler')

// Server Setup
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Lock Setup
var padlockEtherium = require('./lockEtherium')


padlockEtherium.start_EtherumBE();
config.startConfig();

app.get('/', function (req, res) {
    res.send(
        `Hello you!
      use Post on /unlock with message attribute
      `

    )
})


/**
 * Request Body:
 * 
 *          { "message" : " < TimeStamp>"
 *          }
 */
app.post("/unlock", function (req, res) {
    //Compare user and owner
    
    var owner_public_key = config.owner_public_key
    var lock_id = config.lock_id
    
    //Check if person trying to unlock is owner
    if (opgpHandler.verifySignature(req.body.message, owner_public_key)) {
        //Check if timestamp is less than 1s (1000ms) old
        if (Date.now() - 1000 < req.body.message) {
            res.status(202).send("Message accepted.")
        } else {
            res.status(423).send("Timestamp too old.")
        }   
    } else {
        res.status(423).send("Message NOT accepted.")
    }

})

/**
 * 
 *  Request body:
 *          { "pubk": "-----BEGIN PGP PUBLIC KEY BLOCK----- ............... "
 *          }
 * 
 */
app.post("/register", function (req, res) {
    //If factory setting, create token
    var lock_id;
    var created_successfully = false;
    var owner_public_key = req.body.pubk;
    
    while (created_successfully == false) {
        crypto.randomBytes(256, function (err, buffer) {
            lock_id = buffer.toString('hex');
        });
        created_successfully = padlockEtherium.createToken(lock_id, owner_public_key);
    }

    config.createConfigFile(lock_id, owner_public_key)
})

console.log("Starting Server on ", 3000)
app.listen(3000)

//TODO save public key in blockchain and not in id.txt