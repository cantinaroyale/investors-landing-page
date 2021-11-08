import { useCallback, useEffect, useState } from "react";
import Button from "../../../components/Button";
import Img from "../../../components/Img";
import { apeAttributes, TEST_ACCOUNT } from "../../../consts";
import ApeContract from "../../../Contract/ApeContract";
import useWeb3 from "../../../hooks/useWeb3";
import { Attribute } from "../../../types";
import { makeElipsisAddress } from "../../../utils";

import { createGameActions } from "../util";

interface Props {
  updateBackground: (color: string) => void;
}
const actions = createGameActions();

function Header({ updateBackground }: Props) {
  const { web3, address, connect } = useWeb3();
  const [assetUrl, setAssetUrl] = useState("");
  const [assetLoading, setAssetLoading] = useState(false);
  const [addressToFetch, setAddressToFetch] = useState("");

  const handleBackGround = useCallback(
    (attributes: Attribute[]) => {
      const backgroundItem = attributes.find(
        (m: Attribute) => m.trait_type === "Background"
      );
      if (backgroundItem?.value) {
        updateBackground(backgroundItem.value);
      }
    },
    [updateBackground]
  );

  const fetchAsset = useCallback(
    async (account: string) => {
      if (!web3) {
        return;
      }
      const contract = new ApeContract(web3);
      setAssetLoading(true);
      setAssetUrl("");
      try {
        const res = await contract.fetchNfts(account || TEST_ACCOUNT);
        setAssetUrl(res.imageapeData);
        handleBackGround(res.attributes);
        handleFur(res.attributes);
      } catch (error) {
        console.error(error);
      } finally {
        setAssetLoading(false);
      }
    },
    [handleBackGround, web3]
  );

  useEffect(() => {
    if (address) {
      setAddressToFetch(address);
      fetchAsset(address);
    }
    if (!assetUrl) {
      fetchAsset(address);
    }
  }, [address, assetUrl, fetchAsset]);

  const handleFur = (attributes: Attribute[]) => {
    const furItem = attributes.find((m: Attribute) => m.trait_type === "Fur");
    if (furItem) {
      const furIndex = apeAttributes.fur[furItem.value];
      actions.setFur(furIndex);
    }
  };

  const handleChange = (e: any) => {
    e.preventDefault();
    setAddressToFetch(e.target.value);
  };

  return (
    <div className="main-header">
      <Button
        id="connect"
        content={makeElipsisAddress(address, 8) || "Connect Wallet"}
        onClick={connect}
      />
      <div className="main-header-flex">
        <Img src={assetUrl} alt="ape" id="main-header-avatar" />
        <div className="main-header-right">
          <h5 className="main-header-right-text">Paste yout wallet address</h5>
          <section className="main-header-input">
            <input
              placeholder="Insert Address..."
              onChange={handleChange}
              type="text"
              value={addressToFetch}
            />
            <Button
              isLoading={assetLoading}
              content="Load"
              id="fetch-asset"
              onClick={() => fetchAsset(address)}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default Header;
