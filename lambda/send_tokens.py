import os
import json 
from web3 import Web3
from web3.middleware import geth_poa_middleware

def lambda_handler(event, context):
    # Address that logs in to frontend
    transfer_address = event["walletAddress"]
    
    # Operator address from contract
    operator_address = "0x739c0b2413B8778Dfd2B8cBA58b1FAc12A3AEb6E"
    
    w3, contract = configure_web3_provider() # both need to be fed into both other functions
    
    participant = check_participant_status(transfer_address, contract)
    
    # Logic below is too relaxed; need a general failure for bad data or non-existent wallets
    if participant == False:
        return {
            'statusCode': 403,
            'body': json.dumps("Wallet is not an authorized participant according to the contract.")
        }
    elif participant == True:
        print("Wallet is a valid participant, sending tokens...")
        txn = send_tokens(w3, transfer_address, contract, operator_address)
        
        # line below results in a string
        txn_json = Web3.toJSON(txn)
        txn_json = json.loads(txn_json)

        txn_id = txn_json["transactionHash"]
        return {
            'statusCode': 200,
            'body': json.dumps(f'Tokens sent successfully, transaction ID: {txn_id}')
    }
   
    
def configure_web3_provider():
    # Configures web3 provider to have access to private key
    # This is required, since the lambda function will act as the operator
    # Extra special care needs to be taken to ensure that no one can publicly
    # take over this Lambda function to start using my wallet in unintended manners
    
    # line below proves that the MATIC network client is in use 
    #print(w3.clientVersion)
    
    
    infura_id = os.environ.get("INFURA_ID")
    w3 = Web3(Web3.HTTPProvider(f'https://polygon-mainnet.infura.io/v3/{infura_id}'))

    
    w3.middleware_onion.inject(geth_poa_middleware, layer=0)
    
    with open("abi.json") as f:
        abi = json.load(f)
    
    contract = w3.eth.contract(address='0x4F14BAC02d7d8a0219839EC36fd5158489aaEBA5', abi=abi)
    
    return w3, contract
    
    
def check_participant_status(_transfer_address, _contract): 
    
    participant_status = _contract.functions.getParticipantStatus(_transfer_address).call()
    return participant_status
    


def send_tokens(_w3, _transfer_address, _contract, _operator_address):
    # Insert web3.py call to send tokens here
    # Returns transaction ID as string
    
    # Current nonce for the operator address
    nonce = _w3.eth.getTransactionCount(_operator_address)
    
    # Parameters required to send transaction 
    transaction_parameters = {
        'from': _operator_address,
        'nonce': nonce
    }
    
    # Private key from Lambda env vars
    private_key = os.environ.get("PRIVATE_KEY")
    assert private_key is not None, "You must set PRIVATE_KEY environment variable"
    
    transfer_txn = _contract.functions.transfer(_operator_address, _transfer_address, 1).build_transaction(transaction_parameters)
    signed_txn = _w3.eth.account.signTransaction(transfer_txn, private_key=private_key)
    txn = _w3.eth.sendRawTransaction(signed_txn.rawTransaction)
    tx_receipt = _w3.eth.wait_for_transaction_receipt(txn)

    return tx_receipt
    