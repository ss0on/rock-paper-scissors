// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.6;

contract RockPaperScissorsGame {
   
    struct Player {
        uint bet; 
    }
    
    address private owner;
    uint private treasury;

    event depositEvent(address indexed degenerate, uint256 bet);
    event withdrawFundsEvent(address indexed contractOwner, uint256 balance);

    mapping(address => Player) public players;
    constructor() {
        owner = msg.sender; // 'msg.sender' is sender of current call, contract deployer for a constructor
    }

     modifier isOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }
    
    function deposit(uint _bet) payable public {
        require(_bet > 1000000000000000000 wei, 'pay more');
        treasury = msg.value;
        players[msg.sender].bet  += _bet;
        emit depositEvent(msg.sender, _bet );
    }
    
    function withdrawFunds() public payable isOwner{
        payable(msg.sender).transfer(address(this).balance);
        emit withdrawFundsEvent(msg.sender, address(this).balance );
    }
    
    function getViewBalance() public view returns(uint){
        return address(this).balance;
    } 
}

