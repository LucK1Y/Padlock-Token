console.log('hallo ich bin ein Schloss !');
const openpgp = require('openpgp');

const keyStore =require("./pgp_testVals");

(async () => {

    const { keys: [privateKey] } = await openpgp.key.readArmored(keyStore.privateKeyArmored);
    console.log(privateKey)
    await privateKey.decrypt(keyStore.passphrase);

    const { data: cleartext } = await openpgp.sign({
        message: openpgp.cleartext.fromText('Hello, World!'), // CleartextMessage or Message object
        privateKeys: [privateKey]                             // for signing
    });
    console.log(cleartext); // '-----BEGIN PGP SIGNED MESSAGE ... END PGP SIGNATURE-----'



    const verified = await openpgp.verify({
        message: await openpgp.cleartext.readArmored(cleartext),           // parse armored message
        publicKeys: (await openpgp.key.readArmored(keyStore.publicKeyArmored)).keys // for verification
    });
    const { valid } = verified.signatures[0];
    if (valid) {
        console.log('signed by key id ' + verified.signatures[0].keyid.toHex());
    } else {
        throw new Error('signature could not be verified');
    }
})();