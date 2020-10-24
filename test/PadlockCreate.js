const PadlockToken = artifacts.require("PadlockToken");

contract("PadlockToken", (accounts) => {
  const alice = accounts[0];
  const bob = accounts[1];
  const carol = accounts[2];
  const daniel = accounts[3];

  let instance;

  beforeEach(async () => {
    instance = await PadlockToken.deployed();
  });

  it("should keychain be empty", async () => {
    assert.equal(await instance.keychain, "[]", "Keychain should be empty");
  });

  it("should create new PadlockToken", async () => {
    const status = await instance.createToken();
    
    //tx.receipt.status
    assert.equal(status, true, "should create new PadlockToken");

  });


  it("should have correct values", async () => {

    const owner = await instance.owner(token);
    assert.equal(owner,, "should return correct owner");

  });

  it("should correctly determine multiple winners", async () => {
    await instance.vote("test", { from: daniel });
    const winners = JSON.parse(await instance.getWinners());
    assert.equal(winners.length, 2, "there should be 2 winners");
    assert.notEqual(
      winners.findIndex((value) => value === "test"),
      -1,
      "test should be a winner"
    );
    assert.notEqual(
      winners.findIndex((value) => value === "test2"),
      -1,
      "test2 should be a winner"
    );
  });
});
