from brownie import Reputation, accounts

def deploy_reputation(total_supply, operator_address):
    exp_token = Reputation.deploy(total_supply, {"from": operator_address}) 
    return exp_token

def main():
    operator_address = accounts[0]
    total_supply = 1000
    deploy_reputation(total_supply, operator_address)

if __name__ == "__main__":
    main()
