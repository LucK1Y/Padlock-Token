const padlockTokenArtifact = require("../../build/contracts/PadlockToken.json");

const Web3Eth = require('web3-eth');

const eth = new Web3Eth('http://127.0.0.1:7545');//'ws://localhost:8546');


var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || 'ws://some.local-or-remote.node:8546');

const App = {
    account: null,
    lockContract: null,

    start: async function () {
        // const { web3 } = this;

        try {
            // get contract instance
            const networkId = await web3.eth.net.getId();

            const deployedNetwork = padlockTokenArtifact.networks[networkId];
            this.lockContract = new web3.eth.Contract(
                padlockTokenArtifact.abi, deployedNetwork.address
            );

            // get accounts
            const accounts = await web3.eth.getAccounts();
            this.account = accounts[0];

            this.refreshBalance();
        } catch (error) {
            console.error("Could not connect to contract or chain.");
        }
    },

    check_owner: function (params) {
        this.lockContract.owner()
    }


    //Probably not needed
    // refreshBalance: async function () {
    //     const { balanceOf, decimals } = this.dhbw.methods;
    //     const balance = await balanceOf(this.account).call();
    //     const decimal = await decimals().call();

    //     const balanceElement = document.getElementsByClassName("balance")[0];
    //     balanceElement.innerHTML = `${balance / Math.pow(10, decimal)}.${(
    //         balance % 100
    //     )
    //         .toString()
    //         .padStart(2, "0")}`;
    // },

    // setStatus: function (message) {
    //     const status = document.getElementById("status");
    //     status.innerHTML = message;
    // },
};


function start_EtherumBE() {
    // if (ethereum) {
    //     // use MetaMask's provider
    //     App.web3 = new Web3(window.ethereum);
    //     window.ethereum.enable(); // get permission to access accounts
    // } else {
    console.warn(
        "No web3 detected. Falling back to http://127.0.0.1:7545. You should remove this fallback when you deploy live"
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
        new Web3.providers.HttpProvider("http://127.0.0.1:7545")
    );
    // }

    (async () => {
        App.start();
    })();

}

function createToken(id) {
    const { createToken_raw } = window.App.methods;

    createToken_raw(id);
}


module.exports = {
    createToken: createToken,
    start_EtherumBE: start_EtherumBE
}