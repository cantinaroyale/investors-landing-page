import { useState, useEffect } from "react";
import Web3 from "web3";

function useWeb3(): {
  web3?: Web3;
  connect: () => void;
  address: string;
} {
  const [web3, setWeb3] = useState<Web3 | undefined>();
  const [address, setAddress] = useState("");

  useEffect(() => {
    const provider = (window as any).ethereum;
    if (provider) {
      addEventsToProvider(provider);
      const web3Instance = new Web3(provider);
      detectAccount(web3Instance);
      setWeb3(web3Instance);
    }
  }, []);

  const onAccountChanged = (accounts: string[]) => {
    setAddress(accounts[0] || "");
  };

  const addEventsToProvider = (provider: any) => {
    provider.on("accountsChanged", onAccountChanged);
  };
  const detectAccount = async (web3: Web3) => {
    const connectedAccounts = await web3.eth.getAccounts();
    if (connectedAccounts.length > 0) {
      setAddress(connectedAccounts[0]);
    }
  };

  const connect = () => {
    if (!web3) {
      return;
    }
    return web3.eth.requestAccounts();
  };

  return { web3, connect, address };
}

export default useWeb3;
