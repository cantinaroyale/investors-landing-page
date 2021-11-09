import { useEffect, useState } from "react";
import Web3 from "web3";
import { images } from "../../consts";
import Button from "../Button";

const mainChain = Number(process.env.REACT_APP_MAIN_CHAIN);

function NetworkHandler() {
  const [showContent, setShowContent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if ((window as any).ethereum) {
      addListener();
      getChainIdOnLoad();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addListener = () => {
    (window as any).ethereum.on("chainChanged", (chainId: any) => {
      window.location.reload();
    });
  };

  const getChainIdOnLoad = async () => {
    const web3 = new Web3(Web3.givenProvider);
    const res = await web3.eth.getChainId();

    handleChainId(res);
  };

  const handleChainId = (id?: number) => {
    console.log({ mainChain });
    if (!id || id === mainChain) {
      setShowContent(false);
    } else {
      setShowContent(true);
    }
  };

  const changeChain = async () => {
    const web3 = new Web3(Web3.givenProvider);
    const chainId = web3.utils.toHex(mainChain);
    setIsLoading(true);
    try {
      await (window as any).ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId }],
      });
    } catch (error) {
      setIsLoading(false);
    } finally {
    }
  };

  return showContent ? (
    <div className="network-handler">
      <span>
        <img
          src={images.warning}
          alt="warning"
          className="network-handler-warning"
        />
        <p className="network-handler-text">
          Please switch to Ethereum Mainnet
        </p>
      </span>
      <Button
        id="switch-network"
        isLoading={isLoading}
        content="SWITCH TO ETHEREUM MAINNET"
        onClick={changeChain}
      />
    </div>
  ) : null;
}

export default NetworkHandler;
