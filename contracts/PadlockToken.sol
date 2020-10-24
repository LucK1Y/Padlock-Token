pragma solidity ^0.7.2;

contract PadlockToken {
    mapping(uint256 => address) private _balances;
    uint256[] private _keychain;

    constructor() public {
    }

    function name() public pure returns (string memory) {
        return "PadlockToken";
    }

    function symbol() public pure returns (string memory) {
        return "Padlock";
    }

    function keychain() public view returns (uint256[]) {
        return _keychain;
    }

    function owner(uint256 token) public view returns (address) {
        return _balances[token];
    }

    function random() private view returns (uint) {
        return uint(keccak256(block.difficulty, now));
    } 

    function createToken() public view public returns (bool) {
        //Create padlock (random uint256)
        uint256 private newPadlock;
        
        //Check if keychain contains padlock
        //If keychain contains padlock, create new padlock
        bool searchingKey=True;
        while(searchingKey){
            searchingKey=False;

            newPadlock = random();

            for (uint256 i = 0; i < _keychain.length; i++) {
                    // if newPadlock is used in keychain => break and start again
                    if (_keychain[i] ==newPadlock){
                        searchingKey=True;
                        break;
                    }
                }  
        }

        //Else assosiate padlock with wallet
        _keychain.push(newPadlock);
        _balances[msg.sender] = newPadlock;
        
        return true;
    }
}