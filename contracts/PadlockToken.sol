pragma solidity ^0.7.0;




contract PadlockToken {
    struct Lock {
        string pubk;
        address owner;
    }


    event RegisterKeyEvent(
        string pubk,
        string lock_id
    );
    
    mapping(string => Lock) public _ownerTable;

    constructor() {}

    function name() public pure returns (string memory) {
        return "PadlockToken";
    }

    function symbol() public pure returns (string memory) {
        return "Padlock";
    }

    function registerKey(string memory owner_public_key, string memory lock_id) public returns (bool){

        _ownerTable[lock_id] = Lock(owner_public_key,msg.sender);

        require((bytes(_ownerTable[lock_id].pubk).length != 0), "Couldn't register id.");

        emit RegisterKeyEvent(owner_public_key,lock_id);

        return true;
    }

    function getOwnerKey(string memory lock_id) public view returns (string memory) {

        string memory pubk=_ownerTable[lock_id].pubk;

        require(bytes(pubk).length != 0,"Could not find lock_id ");
        return pubk;
    }

    function transferKey(string memory pub_key_new_owner, string memory lock_id, address new_owner) public returns (bool) {

        // check that old owner calls transfer        
        require(msg.sender==_ownerTable[lock_id].owner,"You are not authorised for that action.");

        // register new Owner on lock
        _ownerTable[lock_id]=Lock(pub_key_new_owner,new_owner);

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
