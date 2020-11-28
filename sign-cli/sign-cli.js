const openpgp = require('openpgp');
const readline = require("readline");
const fs = require("fs");
const { exit } = require('process');

const read_line = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let privateKeyRaw = ""

console.log('Willkommen beim automatisch Nachricht signier Programm');

read_line.question("please insert the complete path to your opgp private key: \n", function (path) {
    if (!fs.lstatSync(path).isFile()) {
        console.log("Wrong Path. Restart Programm")
        exit(1)
    }

    fs.readFile(path, function (err, data) {
        if (err) {
            console.log(err);
            exit(1)
        }
        privateKeyRaw = data;


        read_line.question("Please insert your private passphrase: \t", function (passphrase) {
            encrypt_message(passphrase);

        })
    })
})

function encrypt_message(passphrase) {

    (async () => {
        const timeStamp=Date.now().toString()
        console.log("encrypting Timestamp: ",timeStamp)

        const { keys: [privateKey] } = await openpgp.key.readArmored(privateKeyRaw);
        await privateKey.decrypt(passphrase);

        const { data: cleartext } = await openpgp.sign({
            message: openpgp.cleartext.fromText(timeStamp), // CleartextMessage or Message object
            privateKeys: [privateKey]                             // for signing
        });
        console.log("The following is your signed message. Copy it in the singed message field")
        console.log(cleartext); // '-----BEGIN PGP SIGNED MESSAGE ... END PGP SIGNATURE-----'

    })();

    exit(0);
}
