import * as openpgp from 'openpgp';
import Web3 from "web3";
import padLockTokenArtifact from "../../build/contracts/padLockToken.json";

const dom_id_register_form = "registerForm";
const dom_id_unlock_form = "unlockForm";
const dom_unlocked="unlocked_indication";

const App = {
  web3: null,
  account: null,
  padLock: null,
  locked: false,

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

      this.padLock.events.RegisterKeyEvent(console.log)

    } catch (error) {
      console.error("Could not connect to contract or chain.",error);
    }
  },
  getPubk: async function () {

    const { getOwnerKey } = this.padLock.methods;

    const pubk = await getOwnerKey(Lock.id).call();

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
        document.getElementById("lock_image").src = "./public/closed_lock.png";

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

  // https://stackoverflow.com/questions/19454310/stop-form-refreshing-page-on-submit
  handleForm: function (event) { event.preventDefault(); },

  buildForms: function () {
    if (!this.getRegistered()) {
      console.log("Lock has no id yet!");

      var registerform = document.getElementById(dom_id_register_form);
      registerform.hidden = false;

      
      registerform.addEventListener('submit', this.handleForm);
      document.getElementById(dom_id_unlock_form).addEventListener('submit', this.handleForm);

    } else {

      console.log("Lock has already an id!");
      var unlockform = document.getElementById(dom_id_unlock_form);
      unlockform.hidden = false;

      unlockform.addEventListener('submit', this.handleForm);
      document.getElementById(dom_id_register_form).addEventListener('submit', this.handleForm);
    }
  },
  opgp_verifySignature: async function (cleartext, pubk) {
    var verified;
    try {
      verified = await openpgp.verify({
      
        message: await openpgp.cleartext.readArmored(cleartext),           // parse armored message
        publicKeys: (await openpgp.key.readArmored(pubk)).keys // for verification
      });
    } catch (error) {
      alert(error);
    }

    const { valid } = verified.signatures[0];
    if (valid) {
      // check timestamp (is in ms)
      if(verified.message < Date.now() + 30 * 1000 || verified.message > Date.now() + 30 * 1000) {
        return false;
      }
      console.log('signed by key id ' + verified.signatures[0].keyid.toHex());
      return true;
    } else {
      return false;
    }
  },

  verifyOwner: async function (cleartext_timestamp) {
    console.log(cleartext_timestamp,Lock.id)
    const pubk = await App.getPubk();

    console.log("PubK: ",pubk)
    const status = await this.opgp_verifySignature(cleartext_timestamp, pubk);

    if (!status) {
      alert("Signature can not be verified!")
      return
    }
    alert("signature verifyied! Welcome")

    // hide unlock form and show Unlock Indication
    document.getElementById(dom_id_unlock_form).hidden=true;
    document.getElementById(dom_unlocked).hidden=false;


  },

  getRegistered: function getRegistered() {
    return Lock.id != "";
  },

  getRegistered: function getRegistered() {
    return Lock.id != "";
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
    console.error("cannot start metamask thingy")
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    // App.web3 = new Web3(
    //   new Web3.providers.HttpProvider("http://127.0.0.1:7545")
    // );
  }

  App.start();
  Lock.buildForms();



});
