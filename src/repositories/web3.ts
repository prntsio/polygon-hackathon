import Web3 from "web3";

export const web3 = new Web3(Web3.givenProvider);

export const getAccount = async (): Promise<string> => {
  const account = (await web3.eth.getAccounts())[0]
  return account
}