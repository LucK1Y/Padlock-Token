import Web3 from "web3";
import PadlockToken from "../../build/contracts/PadlockToken.json";


const name_id_field = "id_field"
let generated_id = ""

const App = {
  web3: null,
  account: null,
  padLock: null,

  start: async function () {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = PadlockToken.networks[networkId];
      this.padLock = new web3.eth.Contract(
        PadlockToken.abi,
        deployedNetwork.address
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },



  registerLock: async function () {
    console.log("start regitering lock for ", generated_id)

    const pubk = document.getElementById("pubK_input").innerHTML
    const { registerKey } = this.padLock.methods;

    const status = await registerKey(generated_id, pubk).call();
    if (status) {
      alert("Lock registered")
    } else {
      alert("Id is already in use.\nReload page and try anew")
    }
  }

  // refreshBalance: async function () {
  //   const { balanceOf, decimals } = this.dhbw.methods;
  //   const balance = await balanceOf(this.account).call();
  //   const decimal = await decimals().call();

  //   const balanceElement = document.getElementsByClassName("balance")[0];
  //   balanceElement.innerHTML = `${balance / Math.pow(10, decimal)}.${(
  //     balance % 100
  //   )
  //     .toString()
  //     .padStart(2, "0")}`;
  // },

  // sendCoin: async function () {
  //   const amount = parseInt(document.getElementById("amount").value);
  //   const receiver = document.getElementById("receiver").value;

  //   this.setStatus("Initiating transaction... (please wait)");

  //   const { transfer } = this.dhbw.methods;
  //   await transfer(receiver, amount * 100).send({ from: this.account });

  //   this.setStatus("Transaction complete!");
  //   this.refreshBalance();
  // },

  // setStatus: function (message) {
  //   const status = document.getElementById("status");
  //   status.innerHTML = message;
  // },
};

window.App = App;

window.addEventListener("load", function () {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn(
      "No web3 detected. Falling back to http://127.0.0.1:7545. You should remove this fallback when you deploy live"
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:7545")
    );
  }
  App.start();

  generateID();
  loadForm();
});


function generateID() {

  generated_id = ""

  for (let i = 0; i < 64; i++) {
    let n = parseInt(Math.random() * 255) // generate Random Asci Number

    generated_id += String.fromCharCode(n);

  }

  document.getElementById(name_id_field).innerHTML = generated_id
}


function loadForm() {
  const registerform = document.getElementById("RegisterForm");

  registerform.addEventListener('submit', function (event) {
    event.preventDefault();
  });
}