//Read token_id
var fs = require('fs');

var filename = "id.txt"
var lock_id
var owner_public_key

function startConfig() {


    if (fs.exists(filename)) {

        fs.readFile(filename, 'utf8', function (err, data) {
            if (err) throw err;
            console.log('OK: ' + filename);
            lock_id = data.replace(" ", "").split("\n")[0]
            owner_public_key = data.replace(" ", "").split("\n")[1]
        });
    } else {
        console.log("Lock hasn't been registered yet. Please post '/register' to register to this lock")
    }
}

function createConfigFile(lock_id,owner_public_key) {
    fs.writeFile(filename, lock_id + "\n" + owner_public_key, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("The file was saved!");
        token_id = id;
    });
}
module.exports = {
    startConfig:startConfig,
    token_id:token_id,
    owner_id:owner_id,
    owner_public_key: owner_public_key,
    createConfigFile:createConfigFile
}