// SPDX-License-Identifier: CC0

pragma solidity ^0.8.8; // 0.8.8 removes the requirement to add "override" to functions implementing an interface

import "../interfaces/IERC4974.sol";

/// @title PRNTS Reputation System
contract Reputation is IERC4974 {

    struct Participant {
        bool isParticipating;
        uint256 tokenBalance;
    }
    mapping(address => Participant) public participants;
    address operator;
    address zeroAddress = 0x0000000000000000000000000000000000000000; 
    uint256 totalTokens;

    constructor(uint256 _initialSupply) {
        operator = msg.sender;
        totalTokens = _initialSupply;
   }

    function setOperator(address _operator) public {
        ///  @dev EIP-4974 designates that the function: 
        ///  MUST throw unless `msg.sender` is `operator`.
        require(operator == msg.sender, "Only the current Operator can call setOperator.");
        
        ///  @dev MUST throw if `operator` address is either already current `operator`
        ///  or is the zero address.
        require(_operator != operator, "Address is already the current operator.");
        require(_operator != zeroAddress, "Operator cannot be the zero address.");

        operator = _operator;

        emit Appointment(operator);
    }

    function getOperator() view public returns(address) {
        return operator;
    }

    function setParticipation(address _participant, bool _participation) public {
        /// @notice Activate or deactivate participation. CALLER IS RESPONSIBLE TO
        ///  UNDERSTAND THE TERMS OF THEIR PARTICIPATION.        
        /// @param _participant Address opting in or out of participation.
        /// @param _participation Participation status of _participant.

        /// @dev MUST throw unless `msg.sender` is `participant`.
        require(_participant == msg.sender, "Cannot opt in/ out of participation for another address.");
        
        ///  MUST throw if `participant` is `operator` or zero address.
        require(_participant != operator, "Operator cannot be a participant.");
        require(_participant != zeroAddress, "Operator cannot be the zero address.");

        require(participants[_participant].isParticipating != _participation, "Contract call did not change participant status.");

        // Interesting behavior: if not set to "true" in contract call, defaults to "false"
        participants[_participant].isParticipating = _participation;

        emit Participation(_participant, _participation);
    }

    function transfer(address _from, address _to, uint256 _amount) public {
        /// @notice Transfer EXP from one address to a participating address.
        /// @param _from Address from which to transfer EXP tokens.
        /// @param _to Address to which EXP tokens at `from` address will transfer.
        /// @param _amount Total EXP tokens to reallocate.
        /// @dev MUST throw unless `msg.sender` is `operator`.
        require(msg.sender == operator, "Only the operator can transfer tokens.");

        ///  SHOULD throw if `amount` is zero.
        require(_amount > 0, "Must transfer a non-zero amount.");

        ///  MUST throw if `to` and `from` are the same address.
        require(_from != _to, "Cannot transfer to self.");

        ///  MUST throw unless `to` address is participating.
        require(participants[_to].isParticipating == true, "Address is not a participant.");

        ///  MAY allow minting from zero address, burning to the zero address, 
        ///  transferring between accounts, and transferring between contracts.
        participants[_to].tokenBalance += _amount;
        totalTokens -= _amount;

        ///  MUST emit a Transfer event with each successful call.
        emit Transfer(_from, _to, _amount);
    }

    function getParticipantStatus(address _participant) view public returns(bool) {
        return participants[_participant].isParticipating;
    }

    function totalSupply() public view returns (uint256) {
        return totalTokens;
    }

    function balanceOf(address _participant) public view returns (uint256) {
        return participants[_participant].tokenBalance;
    }
}