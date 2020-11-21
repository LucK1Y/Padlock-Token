import openpgp  from "openpgp";
import Web3 from "web3";
import padLockTokenArtifact from "../../build/contracts/padLockToken.json";

const dom_id_register_form = "registerForm";
const dom_id_unlock_form = "unlockForm";


const App = {
  web3: null,
  account: null,
  padLock: null,

  start: async function () {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = padLockTokenArtifact.networks[networkId];
      this.padLock = new web3.eth.Contract(
        padLockTokenArtifact.abi,
        deployedNetwork.address
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

    } catch (error) {
      console.error("Could not connect to contract or chain.");
    }
  },
  getPubk: async function () {

    const { getOwnerKey } = this.padLock.methods;

    const pubk = await getOwnerKey(Lock.id);

    return pubk;
  }
};

const Lock = {
  id: "",
  locked: true,

  registerLock: function registerLock(id) {
    if (Lock.id == "") {
      if(id == "") {
        document.getElementById("hasId").innerText = '"' +  id + '"' + " is an invalid id.\nPlease enter a valid id";
      } else {
        Lock.id = id;
        alert("Succesful registered Id for Lock!")
        document.getElementById("hasId").hidden = true;
        document.getElementById(dom_id_register_form).hidden = true;
        document.getElementById(dom_id_unlock_form).hidden = false;

        return;
      }     
    } else {
      alert("Cannot register id. Lock already has id");

      document.getElementById(dom_id_register_form).hidden = true;
      document.getElementById(dom_id_unlock_form).hidden = false;
    }  
  },

  getRegistered: function getRegistered() {
    return Lock.id != "";
  },

  buildForms: function () {
    if (!this.getRegistered()) {
      console.log("Lock has no id yet!");

      var registerform = document.getElementById(dom_id_register_form);
      registerform.hidden = false;

      // https://stackoverflow.com/questions/19454310/stop-form-refreshing-page-on-submit
      function handleForm(event) { event.preventDefault(); }
      registerform.addEventListener('submit', handleForm);

    } else {

      console.log("Lock has already an id!");
      var unlockform = document.getElementById(dom_id_unlock_form);
      unlockform.hidden = false;

      function handleForm(event) { event.preventDefault(); }
      unlockform.addEventListener('submit', handleForm);
    }
  },
  opgp_verifySignature: async function (cleartext, pubk) {

    const verified = await openpgp.verify({
      message: await openpgp.cleartext.readArmored(cleartext),           // parse armored message
      publicKeys: (await openpgp.key.readArmored(pubk)).keys // for verification
    });
    const { valid } = verified.signatures[0];
    if (valid) {
      console.log('signed by key id ' + verified.signatures[0].keyid.toHex());
      return true;
    } else {
      return false;
    }
  },

  verfiyOwner: async function (cleartext_timestamp) {
    const pubk = await App.getPubk();

    const status = await this.opgp_verifySignature(cleartext_timestamp, pubk);

    if (status) {
      alert("signature verifyied! Welcome")
    } else {
      alert("Signature can not be verified!")
    }

    // TODO Verify TimeStamp

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
  Lock.buildForms();
});
