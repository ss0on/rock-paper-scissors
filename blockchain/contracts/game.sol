// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract Ballot {
   
    struct Player {
        uint bet; 
    }

    
    address private owner;
    uint private treseaure;

    event CheckTresaury(address indexed  treseaureAddress, uint treseaureBalance);

    mapping(address => Player) public players;
    

    constructor() {
        owner = msg.sender; // 'msg.sender' is sender of current call, contract deployer for a constructor
    }
     modifier isOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }
    
    function deposit(uint _bet)payable public {
        require(_bet > 1000000000000000000 wei, 'pay more');
        treseaure = msg.value;
        players[msg.sender].bet  += _bet;
    }
    
    function withdrawFunds() public payable isOwner{
        payable(msg.sender).transfer(address(this).balance);
    }
    
    function getBalance() public {
        emit CheckTresaury (address(this) ,address(this).balance);
    }
    



}

