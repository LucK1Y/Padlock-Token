pragma solidity ^0.7.0;




contract PadlockToken {
    struct Lock {
        string text;
        uint256 id;
        address owner;
        string meta;
    }
    
    mapping(string => string) public _ownerTable;

    constructor() {}

    function name() public pure returns (string memory) {
        return "PadlockToken";
    }

    function symbol() public pure returns (string memory) {
        return "Padlock";
    }

    function registerKey(string memory owner_public_key, string memory lock_id) public returns (bool){

        _ownerTable[lock_id] = owner_public_key;

        // !TODO: Check if lock_id is in owner Table
        // string memory x =_ownerTable[lock_id] ;
        // require(x != owner_public_key, "Couldn't register id.");

        return true;
    }

    function getOwnerKey(string memory lock_id) public view returns (string memory) {
        return _ownerTable[lock_id];
    }

    function transferKey(string memory pub_key_new_owner, string memory lock_id) public returns (bool) {

        //TODO: Check that only correct owner can invoke this methode
        //!!!msg.sender != pub_key 
        
        _ownerTable[lock_id]=pub_key_new_owner;

        return true;
    }

    function lendKey(string memory pub_key_new_owner, string memory lock_id, int lend_time_in_min) public pure returns (bool) {
        //Do it Later
        return true;
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
