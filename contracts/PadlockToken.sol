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

    function keychain() public view returns (uint256[] memory) {
        return _keychain;
    }

    function owner(uint256 token) public view returns (address) {
        return _balances[token];
    }

    function random() private view returns (uint) {
        return uint(keccak256( abi.encodePacked(block.timestamp))); //block.difficulty 
    } 

    function createToken() public returns (uint256) {
        //Create padlock (random uint256)
        uint256 newPadlock;
        
        //Check if keychain contains padlock
        //If keychain contains padlock, create new padlock
        bool searchingKey=true;
        while(searchingKey){
            searchingKey=false;

            newPadlock = random();

            for (uint256 i = 0; i < _keychain.length; i++) {
                    // if newPadlock is used in keychain => break and start again
                    if (_keychain[i] ==newPadlock){
                        searchingKey=true;
                        break;
                    }
                }  
        }

        //Else assosiate padlock with wallet
        _keychain.push(newPadlock);
        _balances[newPadlock] = msg.sender;
        
        return newPadlock;
    }
}