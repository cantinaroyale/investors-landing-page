import { useCallback, useEffect, useRef, useState } from "react";
import Button from "../../../components/Button";
import Img from "../../../components/Img";
import { apeAttributes, DEFAULT_ACCOUNT } from "../../../consts";
import ApeContract from "../../../Contract/ApeContract";
import useWeb3 from "../../../hooks/useWeb3";
import { useMainStore } from "../../../stores/MainStore/inde";
import { APE_ATTRIBUTES, Attribute } from "../../../types";
import { createGameActions } from "../util";

const actions = createGameActions();

function Header() {
  const furRef = useRef<number>();
  const { web3, address, connect, web3Loaded } = useWeb3();

  const [assetUrl, setAssetUrl] = useState("");
  const [assetLoading, setAssetLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { apeFigureLoaded, setShowError, setBackground } = useMainStore();
  const handleBackGround = useCallback(
    (attributes: Attribute[]) => {
      const backgroundItem = attributes.find(
        (m: Attribute) => m.trait_type === APE_ATTRIBUTES.BACKGROUND
      );
      if (!backgroundItem?.value) {
        return;
      }
      const bg = apeAttributes.background[backgroundItem?.value];
      setBackground(bg);
    },
    [setBackground]
  );

  const handleFur = useCallback(
    (attributes: Attribute[]) => {
      const furItem = attributes.find(
        (m: Attribute) => m.trait_type === APE_ATTRIBUTES.FUR
      );
      if (!furItem) {
        return;
      }
      const furIndex = apeAttributes.fur[furItem.value];

      if (apeFigureLoaded) {
        actions.setFur(furIndex);
      } else {
        furRef.current = furIndex;
      }
    },
    [apeFigureLoaded]
  );

  const fetchAsset = async (account: string) => {
    if (!web3) {
      return;
    }

    setAssetLoading(true);
    setAssetUrl("");

    try {
      const contract = new ApeContract(web3);
      const res = await contract.fetchNfts(account);
      setAssetUrl(res.imageapeData);
      handleBackGround(res.attributes);
      handleFur(res.attributes);
      return true;
    } catch (error) {
    } finally {
      setAssetLoading(false);
    }
  };

  useEffect(() => {
    if (web3Loaded) {
      fetchAsset(DEFAULT_ACCOUNT);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [web3Loaded]);

  useEffect(() => {
    if (apeFigureLoaded && furRef.current) {
      actions.setFur(furRef.current);
      furRef.current = undefined;
    }
  }, [apeFigureLoaded]);

  const onFetchClick = async (val: string) => {
    setInputValue(val);
    const res = await fetchAsset(val);
    if (!res) {
      setShowError(true);
    }
  };

  return (
    <div className="main-header">
      <Button
        id="connect"
        content={address ? "Show My Ape" : "Connect Wallet"}
        onClick={address ? () => onFetchClick(address) : connect}
      />
      <div className="main-header-flex">
        <Img src={assetUrl} alt="ape" id="main-header-avatar" />
        <div className="main-header-right">
          <h5 className="main-header-right-text">Paste yout wallet address</h5>
          <section className="main-header-input">
            <input
              placeholder="Insert Address..."
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              value={inputValue}
            />
            <Button
              isLoading={assetLoading}
              content="Load"
              disabled={!inputValue}
              id="fetch-asset"
              onClick={() => onFetchClick(inputValue)}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default Header;
