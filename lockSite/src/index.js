import * as openpgp from 'openpgp';
import Web3 from "web3";
import padLockTokenArtifact from "../../build/contracts/padLockToken.json";

const dom_id_register_form = "registerForm";
const dom_id_unlock_form = "unlockForm";
const dom_unlocked = "unlocked_indication";

/**
 * Object does communicate with web3 and smart contract.
 */
const App = {
  web3: null,
  account: null,    // selected account to communicate with contract
  padLock: null,    // smart contract interface

  /**
   * Function to setup connection to smart contract
   */
  start: async function () {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = padLockTokenArtifact.networks[networkId];

      // setup smart contract
      this.padLock = new web3.eth.Contract(
        padLockTokenArtifact.abi,
        deployedNetwork.address
      );

      // register selected account
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

      // logging for Smart Contract RegisterKeyEvent
      this.padLock.events.RegisterKeyEvent(console.log)

    } catch (error) {
      console.error("Could not connect to contract or chain.", error);
    }
  },

  /**
   * Invoke getOwnerKey for lock id on contract. Returns Public key of owner ( or throws error)
   */
  getPubk: async function () {

    const { getOwnerKey } = this.padLock.methods;

    // call getOwnerKey contract function
    const pubk = await getOwnerKey(Lock.id).call();

    return pubk;
  }
};

/**
 * Object Lock for saving lock data
 */
const Lock = {
  id: "",

  /**
   * Will register an id on this lock instance
   * @param {String} id Lock Id
   */
  registerLock: function registerLock(id) {
    if (this.id == "") {
      // if no id registered
      if (id == "") {

        alert("Cannot register empty ID")
        return
      }

      Lock.id = id;
      alert("Succesful registered Id for Lock!")

      // update page html
      Page.onRegister();

      return;

    } else {
      alert("Cannot register id. Lock already has id");
    }
  },

  /**
   * Returns whether the lock has a id
   */
  getRegistered: function getRegistered() {
    return Lock.id != "";
  },

  /**
   * Verifies signature on a singed message
   * @param {String} cleartext signed message
   * @param {String} pubk Public key to verify singature
   */
  opgp_verifySignature: async function (cleartext, pubk) {
    var verified;
    try {

      // verify the data
      verified = await openpgp.verify({

        // parse the message and the publc key
        message: await openpgp.cleartext.readArmored(cleartext),           // parse armored message
        publicKeys: (await openpgp.key.readArmored(pubk)).keys             // for verification
      });
    } catch (error) {
      alert(error);
      return false;
    }

    const { valid } = verified.signatures[0];
    if (!valid) {
      return false;
    }

    // check timestamp (is in ms) if still valid
    if (verified.data < Date.now() - 30 * 1000) {
      alert("Unlock Message is to old!")
      return false;
    }

    // console.log('signed by key id ' + verified.signatures[0].keyid.toHex());
    return true;

  },

  /**
   * Loads public key and verifies the signed message
   * @param {String} cleartext_timestamp signed message
   */
  verifyOwner: async function (cleartext_timestamp) {

    // calls getOwnerKey contract function to return public key
    const pubk = await App.getPubk();

    if (pubk.length <= 0 || cleartext_timestamp.length <= 0) {
      alert("Signature can not be verified!")
      return
    }

    // verify signature
    const status = await this.opgp_verifySignature(cleartext_timestamp, pubk);

    if (!status) {
      alert("Signature can not be verified!")
      return
    }
    alert("signature verifyied! Welcome")

    // update Page Html
    Page.onunlock()

  },
};

const Page = {
  handleForm: function (event) { event.preventDefault(); },

  /**
   * On New Page load : This function will create the correct register form
   */
  onload: function () {
    if (Lock.getRegistered()) {
      console.log("Lock has already an Id")
      return
    }
    console.log("Lock has no id yet!");

    var registerform = document.getElementById(dom_id_register_form);
    registerform.hidden = false;
    registerform.addEventListener('submit', this.handleForm);
  },

  /**
   * On Register: This function will remove the register form and show the unlock form
   */
  onRegister: function () {

    var unlockform = document.getElementById(dom_id_unlock_form);
    unlockform.hidden = false;
    unlockform.addEventListener('submit', this.handleForm);

    document.getElementById("hasId").innerHTML = "Paste in the signed timestamp <br>message to Unlock the lock." //<br>ID: "+Lock.id;
    document.getElementById(dom_id_register_form).hidden = true;

    document.getElementById("lock_image").src = "./public/closed_lock.png";
    document.getElementById("lock_text").innerHTML = "Locked !"

    document.getElementById("lock_button").hidden = true

    document.getElementById(dom_unlocked).hidden = false

  },


  /**
   * On UN Lock: This function will remove all forms and only show one button to relock the Lock
   */
  onunlock: function () {
    document.getElementById(dom_id_unlock_form).hidden = true;
    document.getElementById(dom_id_register_form).hidden = true;

    document.getElementById("hasId").innerHTML = "Welcome to the open Lock <br>ID: " + Lock.id;

    // 

    document.getElementById("lock_text").innerHTML = "Unlocked !"
    const button = document.getElementById("lock_button")
    button.hidden = false
    button.innerHTML = "Lock"
    button.onclick = this.onRegister

    document.getElementById("lock_image").src = "./public/castle-1290860_1920.jpg";
  },
}

// make the Variables available globally
window.App = App;
window.Lock = Lock;
window.Page = Page;

// onload Setup function
window.addEventListener("load", function () {

  // if metamask is active
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.enable(); // get permission to access accounts
  } else {
    alert("Cannot use metamask! Reload Page.")
  }

  // setup the smart contract connection
  App.start();

  // set up the html
  Page.onload();
});
