const PadlockToken = artifacts.require("PadlockToken");

contract("PadlockToken", (accounts) => {
  const alice = accounts[0];
  const bob = accounts[1];
  const carol = accounts[2];
  const daniel = accounts[3];

  const lock_id = "awdwadwadwadwadawdwa";
  const pubk = "pubKadawdawd";

  let newPadlock;
  let instance;

  beforeEach(async () => {
    instance = await PadlockToken.deployed();
  });

  // alice will be lock owner !
  it("Register Key", async () => {
    const tx = await instance.registerKey(pubk, lock_id);

    assert.equal(tx.receipt.status, true, "Returns status successfull");
  });

  it("Get Owner Key", async () => {
    const lock = await instance._ownerTable(lock_id)

    assert.equal(pubk, lock.pubk, "Should save correct public key");

    const shall_pubk = await instance.getOwnerKey(lock_id);
    assert.equal(shall_pubk, pubk, "Returns correct pubkey");


    // const shall_not_pubK=await instance.getOwnerKey("test_id");

  });

  it("Transfer Key", async () => {

    // alice transfers lock to bob
    const tx = await instance.transferKey(pubk, lock_id, bob);
    assert.equal(tx.receipt.status, true, "Transfer lock to bob successfull");

    // alice tries to transfer lock to herself, but is not owner
    try {
      const ftx = await instance.transferKey(pubk, lock_id, alice);
    } catch (error) {
      const error_msg_should = "Returned error: VM Exception while processing transaction: revert You are not authorised for that action. -- Reason given: You are not authorised for that action.."
      assert.equal(error.message, error_msg_should, "Shoudl throw error as alice is not authorised");

    }
    const lock = await instance._ownerTable(lock_id);
    assert.equal(bob, lock.owner, "Should show bob as new owner");

  });


  it("Lend Key", async () => {
    /**
     * Important: Bob owns lock and lends it to alice
     */


    const tmpPubK = "otherPubk";
    const timeStampExpiary = Date.now().toString()

    const tx = await instance.lendKey(tmpPubK, lock_id, timeStampExpiary,{from:bob})
    assert.equal(tx.receipt.status, true, "Shoudl register temporal key");

    const lock = await instance._ownerTable(lock_id);
    assert.equal(tmpPubK, lock.tempPubk, "Should save correct temporary public key");
    assert.equal(timeStampExpiary, lock.expDate, "Should save correct timestamp for exirpation date");


    const savedTmpKey = await instance.getTemporaryKey(lock_id, timeStampExpiary - 1)
    assert.equal(tmpPubK, savedTmpKey, "Should return correct temporary public key");


    try {
      const savedTmpKey = await instance.getTemporaryKey(lock_id, timeStampExpiary + 1)
    } catch (error) {
      const error_msg_should = "Returned error: VM Exception while processing transaction: revert You are no longer authorised to use that lock."
      assert.equal(error.message, error_msg_should, "Shoudl throw error as timestamp is run out");
    }

  });

});