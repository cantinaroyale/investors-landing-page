import { useEffect, useRef, useState } from "react";
import Button from "../../../components/Button";
import Img from "../../../components/Img";
import ApeContract from "../../../Contract/ApeContract";
import useWeb3 from "../../../hooks/useWeb3";
import { makeElipsisAddress } from "../../../utils";

import Web3Provider from "../../../Web3Provider";

function NftPreview() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { web3, address, connect } = useWeb3();
  const [assetUrl, setAssetUrl] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [addressToFetch, setAddressToFetch] = useState("denis");
  const fetchAsset = async () => {
    if (!web3) {
      return;
    }
    const contract = new ApeContract(web3);
    contract.fetchNfts("0xbe5a96f7f91c2d5e1372aee199ba2cd1a0732500");
  };

  //   useEffect(() => {
  //     if (address) {
  //       setAddressToFetch(address);
  //     }
  //   }, [address]);

  const handleChange = (val: any) => {
    console.log(val.target.value);
    setAddressToFetch(val.target.value);
  };

  return (
    <div className="nft-preview">
      <Button
        id="connect"
        content={makeElipsisAddress(address, 12) || "Connect Wallet"}
        onClick={connect}
      />
      <div className="nft-preview-flex">
        <Img src={assetUrl} alt="ape" id="nft-preview-avatar" />
        <section className="nft-preview-input">
          <input onChange={handleChange} type="text" value={addressToFetch} />
          <Button content="Load" id="fetch-asset" onClick={fetchAsset} />
        </section>
      </div>
    </div>
  );
}

export default NftPreview;
