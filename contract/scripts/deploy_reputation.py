from brownie import Reputation, accounts

def deploy_reputation(total_supply, address):
    exp_token = Reputation.deploy(total_supply, {"from": address}) 
    return exp_token

def main():
    account = accounts.load('new-deployer')
    total_supply = 100000
    return Reputation.deploy(total_supply, {"from": account}, publish_source=True)

if __name__ == "__main__":
    main()
