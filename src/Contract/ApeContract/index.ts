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
    console.log({ itemId });
    let itemUrl = await this.contract.methods.tokenURI(itemId).call();
    console.log({ itemUrl });
    let res = await fetch(itemUrl.replace("ipfs://", "https://ipfs.io/ipfs/"));

    const apeData = await res.json();

    const apeFur = apeData.attributes[0].value;
    apeData.image = apeData.image.replace("ipfs://", "https://ipfs.io/ipfs/");
    console.log({ apeData });
  }
}

export default ApeContract;
