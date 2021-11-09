import { useCallback, useEffect, useState } from "react";
import Button from "../../../components/Button";
import Img from "../../../components/Img";
import { apeAttributes, TEST_ACCOUNT } from "../../../consts";
import ApeContract from "../../../Contract/ApeContract";
import useWeb3 from "../../../hooks/useWeb3";
import { Attribute } from "../../../types";
import { createGameActions } from "../util";

interface Props {
  updateBackground: (color: string) => void;
  showError: () => void;
}
const actions = createGameActions();

function Header({ updateBackground, showError }: Props) {
  const { web3, address, connect, web3Loaded } = useWeb3();
  const [assetUrl, setAssetUrl] = useState("");
  const [assetLoading, setAssetLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

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

  const handleFur = (attributes: Attribute[]) => {
    const furItem = attributes.find((m: Attribute) => m.trait_type === "Fur");
    if (furItem) {
      const furIndex = apeAttributes.fur[furItem.value];
      actions.setFur(furIndex);
    }
  };

  const fetchAsset = async (account: string) => {
    if (!web3) {
      return;
    }
    const contract = new ApeContract(web3);
    setAssetLoading(true);
    setAssetUrl("");

    try {
      const res = await contract.fetchNfts(account);
      setAssetUrl(res.imageapeData);
      handleBackGround(res.attributes);
      handleFur(res.attributes);
    } catch (error) {
      showError();
    } finally {
      setAssetLoading(false);
    }
  };

  useEffect(() => {
    if (web3Loaded) {
      fetchAsset(TEST_ACCOUNT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3Loaded]);

  const onFetchMyApe = (address: string) => {
    setInputValue(address);
    fetchAsset(address);
  };

  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="main-header">
      <Button
        id="connect"
        content={address ? "Show My Ape" : "Connect Wallet"}
        onClick={address ? () => onFetchMyApe(address) : connect}
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
              value={inputValue}
            />
            <Button
              isLoading={assetLoading}
              content="Load"
              disabled={!inputValue}
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
