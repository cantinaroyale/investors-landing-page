import Web3 from "web3";
import { abi } from "./abi";

class ApeContract {
  contract: any;
  constructor(web3: Web3) {
    this.contract = new web3.eth.Contract(
      abi as any,
      process.env.REACT_APP_APES_CONTRACT
    );
  }

  async fetchNfts(address: string) {
    let itemId = await this.contract.methods
      .tokenOfOwnerByIndex(address, 0)
      .call();
    let itemUrl = await this.contract.methods.tokenURI(itemId).call();
    let res = await fetch(itemUrl.replace("ipfs://", "https://ipfs.io/ipfs/"));

    const apeData = await res.json();
    apeData.imageapeData = apeData.image.replace(
      "ipfs://",
      "https://ipfs.io/ipfs/"
    );
    return apeData;
  }
}

export default ApeContract;
