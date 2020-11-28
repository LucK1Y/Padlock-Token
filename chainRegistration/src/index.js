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

      console.log("Using account ",this.account)

      // logging ?? Not working
      this.padLock.events.RegisterKeyEvent(console.log)

    } catch (error) {
      console.error("Could not connect to contract or chain.", error);
    }
  },

  registerLock: async function () {
    console.log("start registering lock for ", generated_id)

    const pubk = document.getElementById("pubK_input").value
    const { registerKey } = this.padLock.methods;

    const tx = await registerKey(pubk,generated_id).send({ from: this.account });
    if (tx.status) {
      alert("Lock registered")

      document.getElementById("lock_register").hidden=true;
      document.getElementById("transfer_lock").hidden=false;
    } else {
      alert("Id is already in use.\nReload page and try anew")
    }
  },

  transferLock: async function () {
    const pubk = document.getElementById("pubK_input").value 
    const new_owner=document.getElementById("new_owner_adress").value

    const { transferKey } = this.padLock.methods;

    const tx=await transferKey(pubk,generated_id,new_owner).send({from:this.account})

    if (tx.status) {
      alert("Lock transfered")
      location.reload()
    } else {
      alert("Cannot transfer ownership!")
    }
  }

};

window.App = App;

window.addEventListener("load", function () {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    alert("cannot use metamask!")
  }
  App.start();

  generateID();
  loadForm();
});

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateID() {

  generated_id = ""

  for (let i = 0; i < 64; i++) {
    let n = 0;
    while (n == 0 || n == 34 || n == 39) {
      n = getRndInteger(33, 126);
    }

    generated_id += String.fromCharCode(n);

  }

  document.getElementById(name_id_field).innerHTML = generated_id
}


function loadForm() {
  // deactivate page refreshing on all forms
  const forms = document.getElementsByTagName("form");

  for (const f in forms) {
    if (forms.hasOwnProperty(f)) {
      const element = forms[f];
      
      element.addEventListener('submit', function (event) {
        event.preventDefault();
      });
    }
  }


}