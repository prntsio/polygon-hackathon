from brownie import accounts as acct, ZERO_ADDRESS
import pytest
from scripts.deploy_reputation import deploy_reputation

@pytest.fixture(scope="module")
def reputation():
    # Arrange
    ## Initial variables
    total_supply = 100000

    ## Deploy required contract
    return deploy_reputation(total_supply, acct[0])

def test_get_token_total_supply(reputation):
    assert reputation.totalSupply({"from": acct[0]}) == 100000, "Reputation token's total supply is wrong"

def test_set_operator(reputation):
    reputation.setOperator(acct[1], {"from": acct[0]}) 
    assert reputation.getOperator({"from": acct[0]}) == acct[1], "Operator address failed to change to new address"

def test_set_participation(reputation):
    reputation.setParticipation(acct[2], True, {"from": acct[2]})
    assert reputation.getParticipantStatus(acct[2]) == True, "Participant user is not set as participating"

def test_participating_user_transfer(reputation):
    reputation.transfer(acct[1], acct[2], 100, {"from": acct[1]})
    assert reputation.balanceOf(acct[2]) == 100, "Participant user does not have transferred tokens"

'''def test_non_participating_user_transfer(reputation):
    reputation.transfer(acct[1], acct[3], 100, {"from": acct[1]})
    # We want this one to revert
    '''

def test_total_supply_after_transfer(reputation):
    assert reputation.totalSupply() == 99900, "Total supply has not been updated correctly after transfer to user"

def test_burn_tokens(reputation):
    '''
    Have a bit of a conundrum here; cannot transfer back to the contract or the zero address, because neither are a 
    participant, but neither can be marked as a participant either. 
    Solutions:
    - Dedicated burn() function
    - Proxy address to hold tokens that have been taken away

    Proxy feels like the quick fix, dedicated burn() feels better
    If I add a burn() a mint() probably also makes sense, but need to consider the consequences - 
    - If a certain user has a large amount of tokens, more supply can be minted to drown them out 
    '''
    reputation.transfer(acct[2], ZERO_ADDRESS, 100, {"from": acct[1]})
    assert reputation.balanceOf(acct[2]) == 0, "Participant user still has transferred tokens"
