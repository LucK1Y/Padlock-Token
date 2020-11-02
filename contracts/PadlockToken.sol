pragma solidity ^0.7.2;

contract PadlockToken {
    struct Lock {
        string text;
        uint256 id;
        address owner;
        string meta;
    }

    mapping(address => Lock) private _balances;
    uint256[] private _keychain;

    constructor() public {}

    function name() public pure returns (string memory) {
        return "PadlockToken";
    }

    function symbol() public pure returns (string memory) {
        return "Padlock";
    }

    function keychain() public view returns (uint256[] memory) {
        return _keychain;
    }

     function owner(Lock token ) public view returns (address memory) {
         return token.owner;
    }

    function createToken(uint256 lock_id ) public returns (bool memory) {

        //Create new Lock
        Lock memory newLock = Lock(
            
            // set text-name as some weird bytes
            string(abi.encodePacked(lock_id)),
            // set lock id
            lock_id,
            // set sender as owner
            msg.sender,
            // set some meta string
            "hello World!"
        );

        // assosiate padlock with wallet       
        if(_keychain.includes(newLock.id)) {
            require(false,"LockId is already in use");
            return false;
        } else {
            _keychain.push(newLock.id);
            _balances[msg.sender] = newLock;
            return true;
        }             
    }
}
