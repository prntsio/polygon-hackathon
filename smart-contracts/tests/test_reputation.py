from brownie import accounts
from scripts.deploy_reputation import deploy_reputation

def test_reputation_deployment():
     
    # Arrange
    ## Initial variables
    operator_address = accounts[0] # Deploys contract, sends tokens
    user_1_address = accounts[1] # Non-participating address
    user_2_address = accounts[2] # Participating address
    total_supply = 1000

    ## Deploy required contracts
    reputation_contract = deploy_reputation(total_supply, operator_address)

    # Act 
    ## Read initial supply from token contracts
    reputation_token_total_supply = reputation_contract.totalSupply({"from": operator_address})

    ## Set users' participation status
    user_address_not_participating = reputation_contract.getParticipantStatus(user_1_address, {"from": user_1_address})
    reputation_contract.setParticipation(user_2_address, True, {"from": user_2_address})
    user_address_participating = reputation_contract.getParticipantStatus(user_2_address, {"from": user_2_address})

    ## Transfer 

    # Assert
    assert reputation_token_total_supply == total_supply, "Reputation token's total supply is wrong"
    assert user_address_not_participating == False, "Non-participating address is participating"
    assert user_address_participating == True, "Participant address is not participating"
    return reputation_contract

def test_set_operator():
    pass 

def test_reputation_token_initial_supply():
    pass 

def test_set_participation():
    pass 

def test_non_participating_user_transfer():
    pass 

def test_participating_user_transfer():
    pass 

def test_total_supply_after_transfer():
    pass 

def test_transfer_tokens_back_to_contract():
    pass 


    
