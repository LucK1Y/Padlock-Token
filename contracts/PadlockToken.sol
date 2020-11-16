pragma solidity ^0.7.0;




contract PadlockToken {
    struct Lock {
        string text;
        uint256 id;
        address owner;
        string meta;
    }
    
    mapping(uint256 => string) public _ownerTable;

    constructor() public {}

    function name() public pure returns (string memory) {
        return "PadlockToken";
    }

    function symbol() public pure returns (string memory) {
        return "Padlock";
    }

    function registerKey(string public_key) public returns (bool){

        _ownerTable[lock_id]=public_key;

        return true;
    }

    function getOwnerKey(uint256 lock_id) public returns (string) {
        return "Helllo World";
    }

    function transferKey(uint256 lock_id, address owner) public returns (bool) {
    }

    function lendKey(uint256 lock_id, address owner) public returns (bool) {
    }
























    // // mapping(uint256 => Lock) private _locks;
    // uint256 private _lockCount;
    // mapping(uint256 => bool) public _keychain;



    // function getLockCount() public view returns (uint256) {
    //     return _lockCount;
    // }
        // _lockCount=0;

    // function includes(uint256 key) private returns (bool) {
    //     return _keychain[key];
    // }

    // function createToken(uint256 lock_id, address owner) public returns (bool) {

    //     // check lock_id new
    //     require(!includes(lock_id), "LockId is already in use");

    //     //Create new Lock
    //     Lock memory newLock = Lock(
    //         // set text-name as some weird bytes
    //         string(abi.encodePacked(lock_id)),
    //         // set lock id
    //         lock_id,
    //         // set sender as owner
    //         owner,
    //         // set some meta string
    //         "hello World!"
    //     );

    //     // assosiate padlock with wallet
    //     _keychain[newLock.id]=true;
    //     _lockCount = _lockCount+1;

    //     _locks[lock_id]=newLock;
    //     //_private_keychain[]
    //     return true;
    // }
}
