const fetch = require('node-fetch');
const keyStore = require("./pgp_testVals");


const url="http://localhost:3000/unlock"


const text="hello text";

const signed_text=(async () => {

    const { keys: [privateKey] } = await openpgp.key.readArmored(keyStore.privateKeyArmored);
    console.log(privateKey)
    await privateKey.decrypt(keyStore.passphrase);

    const { data: cleartext } = await openpgp.sign({
        message: openpgp.cleartext.fromText(text), // CleartextMessage or Message object
        privateKeys: [privateKey]                             // for signing
    });
    console.log(cleartext); // '-----BEGIN PGP SIGNED MESSAGE ... END PGP SIGNATURE-----'

    return cleartext;
})

const body = {
    "message":signed_text
};


fetch(url, {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.text())
    .then(json => console.log(json));