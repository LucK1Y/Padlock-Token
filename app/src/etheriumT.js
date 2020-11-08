const padlockTokenArtifact = require("../../build/contracts/PadlockToken.json");

// https://web3js.readthedocs.io/en/v1.2.11/include_package-core.html?highlight=HttpProvider#example
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));

var contract;
var account;

async function startEtherumServer() {
    const networkId = await web3.eth.net.getId();

    const deployedNetwork = padlockTokenArtifact.networks[networkId];
    contract = new web3.eth.Contract(
        padlockTokenArtifact.abi, deployedNetwork.address
    );
    console.log(contract)

    // get accounts
    const accounts = await web3.eth.getAccounts();
    account = accounts[0];

    console.log(accounts)

}

async function createID_Token() {
    // Generate ID
    const array_para = [parseInt(10)]
    const encoded_para = web3.eth.abi.encodeParameter('uint256', '10');
    const int_para = 10

    var { createToken,name } = contract.methods

    const rt = await name().call();
    console.log(rt)

    const sucess = await createToken(int_para).call();

    if (sucess){
        console.log("Created Token succesful")
    }

}


(async () => {

    await startEtherumServer();

    await createID_Token();
})();

