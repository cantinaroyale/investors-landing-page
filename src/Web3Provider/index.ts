import Web3 from "web3";

class Web3Provider {
  web3: Web3;
  ethereum;
  address: string = "";
  constructor(provider: any) {
    this.ethereum = provider;
    this.addEventsToProvider(this.ethereum);
    this.web3 = new Web3(provider);
  }

  addEventsToProvider(provider: any) {
    provider.on("accountsChanged", this.onAccountChanged);
  }

  onAccountChanged(address: string[]) {
    this.address = address[0] || "";
  }

  async connect() {
    return await this.web3.eth.requestAccounts();
  }
}

export default Web3Provider;
