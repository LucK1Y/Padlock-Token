import Web3 from "web3";
import padlockTokenArtifact from "../../build/contracts/PadlockToken.json";

const dom_id_register_form = "registerForm";

const App = {
  web3: null,
  account: null,
  padlock: null,

  start: async function () {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = padlockTokenArtifact.networks[networkId];
      this.padlock = new web3.eth.Contract(
        padlockTokenArtifact.abi,
        deployedNetwork.address
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  }
};

const Lock = {
  id: "",
  locked: true,

  registerLock: function registerLock(id) {
    if (id == "") {
      Lock.id = id;
      alert("Id in Lock Succesful registered!")
    } else {
      alert("Cannot register id. Lock has already id");
    }

    document.getElementById(dom_id_register_form).hidden = true;
  },

  getRegistered: function getRegistered() {
    return Lock.id != "";
  },

  buildRegister: function buildRegister(id_dom) {
    if (!this.getRegistered()) {
      console.log("Lock has no id yet!");

      var registerform = document.getElementById(id_dom);
      registerform.hidden = false;

      // https://stackoverflow.com/questions/19454310/stop-form-refreshing-page-on-submit
      function handleForm(event) { event.preventDefault(); }
      registerform.addEventListener('submit', handleForm);
    } else {
      console.log("Lock has already an id!");
    }
  }
};
window.App = App;
window.Lock = Lock;

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
  Lock.buildRegister(dom_id_register_form);
});
