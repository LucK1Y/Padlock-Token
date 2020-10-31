// IMPORTS PGP
const keyStore = require("./pgp_testVals");

function verifySignature(cleartext) {
    return (async () => {

        const verified = await openpgp.verify({
            message: await openpgp.cleartext.readArmored(cleartext),           // parse armored message
            publicKeys: (await openpgp.key.readArmored(keyStore.publicKeyArmored)).keys // for verification
        });
        const { valid } = verified.signatures[0];
        if (valid) {
            console.log('signed by key id ' + verified.signatures[0].keyid.toHex());
        } else {
            // throw new Error('signature could not be verified');
            return false;
        }
        return true;
    })
}
module.exports = {
    verifySignature: verifySignature
}
