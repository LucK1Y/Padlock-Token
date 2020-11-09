pragma solidity ^0.7.2;
pragma experimental ABIEncoderV2;

contract PadlockToken {
    struct Lock {
        string text;
        uint256 id;
        address owner;
        string meta;
    }

    // mapping(uint256 => Lock) private _locks;
    uint256 private _lockCount;
    mapping(uint256 => bool) public _keychain;

    constructor() public {
        _lockCount=0;
    }

    function name() public pure returns (string memory) {
        return "PadlockToken";
    }

    function symbol() public pure returns (string memory) {
        return "Padlock";
    }
    function getLockCount() public view returns (uint256) {
        return _lockCount;
    }

    // ! TODO: not possible to return mapping, method not needed

    // function keychain() public view returns (mapping(uint256 => bool) memory) {
    //     return _keychain;
    // }

    // function getOwnerForLock(uint256 lock_id) public view returns (address) {
    //     Lock memory lock = _locks[lock_id];
    //     require(lock.id != 0,"There is no lock for this id!");

    //     return lock.owner;
    // }

    function includes(uint256 key) private returns (bool) {
        return _keychain[key];
    }

    function createToken(uint256 lock_id, address owner) public returns (bool) {

        // check lock_id new
        require(!includes(lock_id), "LockId is already in use");

        //Create new Lock
        Lock memory newLock = Lock(
            // set text-name as some weird bytes
            string(abi.encodePacked(lock_id)),
            // set lock id
            lock_id,
            // set sender as owner
            owner,
            // set some meta string
            "hello World!"
        );

        // assosiate padlock with wallet
        _keychain[newLock.id]=true;
        _lockCount = _lockCount+1;

        _locks[lock_id]=newLock;
        //_private_keychain[]
        return true;
    }
}
