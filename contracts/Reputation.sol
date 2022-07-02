// SPDX-License-Identifier: CC0

pragma solidity ^0.8.8; // 0.8.8 removes the requirement to add "override" to functions implementing an interface

import "./inherited/IERC4974.sol";

/// @title PRNTS Reputation System
contract Reputation is IERC4974 {

    address operator;
    constructor() {
        operator = msg.sender;
   }

    function setOperator(address _operator) public {
        ///  @dev EIP-4974 designates that the function: 
        ///  MUST throw unless `msg.sender` is `operator`.
        require(operator == msg.sender, "Only the current Operator can call setOperator.");
        
        ///  @dev MUST throw if `operator` address is either already current `operator`
        ///  or is the zero address.
        require(_operator != operator, "Address is already the current operator.");

        operator = _operator;     
    }

    function getOperator() view public returns(address) {
        return operator;
    }

    function setParticipation(address _participant, bool _participation) public {

    }

    function transfer(address _from, address _to, uint256 _amount) public {

    }

    function totalSupply() public view returns (uint256) {

    }

    function balanceOf(address _participant) public view returns (uint256) {

    }


}