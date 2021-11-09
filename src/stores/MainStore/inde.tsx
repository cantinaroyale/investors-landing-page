import React, { createContext, useContext, useState } from "react";
import { DEFAULT_BACKGROUND_COLOR } from "../../consts";

interface IState {
  apeFigureLoaded: boolean;
  setApeFigureLoaded: (val: boolean) => void;
  showError: boolean;
  setShowError: (val: boolean) => void;
  background: string;
  setBackground: (val: string) => void;
}

const MainStoreContext = createContext<IState>({} as IState);

interface IProps {
  children: React.ReactNode;
}

const MainStore = ({ children }: IProps) => {
  const [apeFigureLoaded, setApeFigureLoaded] = useState(false);
  const [showError, setShowError] = useState(false);
  const [background, setBackground] = useState(DEFAULT_BACKGROUND_COLOR);

  const value = {
    apeFigureLoaded,
    setApeFigureLoaded,
    showError,
    setShowError,
    background,
    setBackground,
  };
  return (
    <MainStoreContext.Provider value={value}>
      {children}
    </MainStoreContext.Provider>
  );
};
const useMainStore = () => useContext(MainStoreContext);
export { MainStore, useMainStore };
