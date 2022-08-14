import os
import json 
from eth_account import Account
from eth_account.signers.local import LocalAccount
import web3
from web3.auto import w3
from web3.middleware import construct_sign_and_send_raw_middleware

# Polygon chainId = 137 

def lambda_handler(event, context):
    wallet = event["walletAddress"]
    account, contract = configure_web3_provider()
    participant = check_participant_status(account, contract, wallet)
    
    if participant == False:
        return {
            'statusCode': 403,
            'body': json.dumps("Wallet is not an authorized participant according to the contract.")
        }
    elif participant == True:
        print("Wallet is a valid participant, sending tokens...")
        transaction = send_tokens(provider, account, wallet)
        return {
            'statusCode': 200,
            'body': json.dumps(f'Tokens sent successfully, transaction ID: {transaction}')
    }
   
    
def configure_web3_provider():
    # Configures web3 provider to have access to private key
    # This is required, since the lambda function will act as the operator
    # Extra special care needs to be taken to ensure that no one can publicly
    # take over this Lambda function to start using my wallet in unintended manners
    infura_id = os.environ.get("INFURA_ID")
    provider = web3.HTTPProvider(f'https://polygon-mainnet.infura.io/v3/{infura_id}')
    private_key = os.environ.get("PRIVATE_KEY")
    assert private_key is not None, "You must set PRIVATE_KEY environment variable"

    account: LocalAccount = Account.from_key(private_key)
    w3.middleware_onion.add(construct_sign_and_send_raw_middleware(account))

    print(f"Your hot wallet address is {account.address}")
    account = account.address
    
    with open("abi.json") as f:
        abi = json.load(f)
    
    contract = w3.eth.contract(address='0x4F14BAC02d7d8a0219839EC36fd5158489aaEBA5', abi=abi)
    
    return account, contract
    
    
def check_participant_status(_account, _contract, _receiving_wallet_address):
    # Returns bool 
    #if type(walletAddress) == 'str':
    
    transaction_parameters = {
        'chainId': 137
    }
    
    participant_status = _contract.caller({'from': _account}).getParticipantStatus(_receiving_wallet_address).build_transaction(transaction_parameters)
    print(participant_status)
    
    return participant_status
    
    '''


web3.eth.send_transaction(contract_data)
    '''


def send_tokens(_account, _contract, _receiving_wallet_address):
    # Insert web3.py call to send tokens here
    # Returns transaction ID as string
    
    
    return "aowienfaosdnvasodnv"


    