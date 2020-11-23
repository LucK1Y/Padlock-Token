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

  it("Register Key", async () => {
    const tx = await instance.registerKey(pubk, lock_id);

    assert.equal(tx.receipt.status, true, "Returns status successfull");
  });

  it("Get Owner Key", async () => {

    assert.equal(pubk,await instance._ownerTable(lock_id));

    const shall_pubk = await instance.getOwnerKey(lock_id);
    assert.equal(shall_pubk, pubk, "Returns successfully");

    // const shall_not_pubK=await instance.getOwnerKey("test_id");

  });
  it("Transfer Key", async () => {
    // Not Implemented yet
    const tx = await instance.transferKey(pubk, lock_id);
    assert.equal(tx.receipt.status, true, "Returns status successfull");

  });
  it("Lend Key", async () => {
    // Not Implemented yet
    const tx = await instance.lendKey(pubk, lock_id, 15);
    assert.equal(tx.receipt.status, true, "");

  });

});