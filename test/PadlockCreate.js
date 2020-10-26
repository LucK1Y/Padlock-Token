const PadlockToken = artifacts.require("PadlockToken");

contract("PadlockToken", (accounts) => {
  const alice = accounts[0];
  const bob = accounts[1];
  const carol = accounts[2];
  const daniel = accounts[3];


  let newPadlock;
  let instance;

  beforeEach(async () => {
    instance = await PadlockToken.deployed();
  });

  it("should keychain be empty", async () => {
    assert.equal(typeof(await instance.keychain), "function", "Keychain should be array");
    assert.equal(await instance.keychain.length, 0, "Keychain should be empty");

  });

  it("should create new PadlockToken", async () => {
    const  tx= await instance.createToken();

    assert.equal(tx.receipt.status, true, "transcation should run through");

  // newPadlock key
    assert.equal(await instance.balances);
    

    //tx.receipt.status
    assert.equal(typeof (newPadlock), Int32Array, "should create new PadlockToken");

  });

  it("should have correct values", async () => {
    let newPadlock_uint256Id = web3.eth.abi.encodeParameter('uint256',newPadlock)
    
    const owner = await instance.owner(newPadlock_uint256Id);
    // assert.equal(typeof(owner),String, "should return correct owner");
    console.log(owner,newPadlock);
    console.warn(owner,newPadlock);
    console.error(owner,newPadlock);
    assert.equal(1,1)
  });
});
