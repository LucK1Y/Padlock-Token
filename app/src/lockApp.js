// IMPORTS SERVER
const express = require('express')
var bodyParser = require('body-parser');

// import OPGP Handler
var opgpHandler= require('./opgpHandler')

// SERVER SETUP
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.send(
        `Hello you!
      use Post on /unlock with message attribute
      `

    )
})

app.post("/unlock", function (req, res) {
    // check values okay

    if (opgpHandler.verifySignature(req.body.message)){
        res.status(202).send("Message accepted.")
    } else {
        res.status(423).send("Message NOT accepted.")
    }

})

console.log("Starting Server on ",3000)
app.listen(3000)