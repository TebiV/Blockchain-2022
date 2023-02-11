// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Blockchain2022 is Ownable {
    constructor (){
      transferOwnership(msg.sender);
    }

    event LogWithdrawal(address recipient, uint256 amount);


    /*
    --- ONLY OWNER SECTION ---
    */

    /**
     * Function to withdraw all funds
    */
    function withdraw() external onlyOwner {
        require(address(this).balance > 0, "No funds available for withdraw.");
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
        emit LogWithdrawal(owner(), balance);
    }

    /**
     * Function to withdraw specific amount of our funds
    */
    function withdrawTo(address recipient, uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient funds to made at withdraw.");
        payable(recipient).transfer(amount);
        emit LogWithdrawal(recipient, amount);
    }

    /*
    --- PUBLIC SECTION ---
    */

    /**
     * Function to view the current balance of the address
    */
    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    /**
     * Function to view the owner address
    */
    function getOwner() external view returns (address) {
        return owner();
    }

    /**
     * Function to allow external addresses deposit funds into the contract
    */
     receive() external payable {
        
     }
}