const padlockTokenArtifact = require("../../build/contracts/PadlockToken.json");

// https://web3js.readthedocs.io/en/v1.2.11/include_package-core.html?highlight=HttpProvider#example
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));

var contract;
var account;

function startEtherumServer() {
    (async () => {


        const networkId = await web3.eth.net.getId();

        const deployedNetwork = padlockTokenArtifact.networks[networkId];
        contract = new web3.eth.Contract(
            padlockTokenArtifact.abi, deployedNetwork.address
        );

        // get accounts
        const accounts = await web3.eth.getAccounts();
        account = accounts[0];

    })();
}


function createToken(id) {

    var { createToken, name } = contract.methods

    const rt = await name().call();
}



// function get_owner(lock_id) {

//     return (async () => {

//         var { getLockForOwner } = contract.methods

//         const owner_id = await getLockForOwner(lock_id).call();

//         if (owner_id != NULL) {
//             return owner_id
//         } else {
//             return -1
//         }
        


//     })();
// }

module.exports = {
    startEtherumServer: startEtherumServer,
    createToken: createToken,
    check_owner: check_owner
}