import React, { createContext, useContext, useState } from "react";

interface IState {
  apeFigureLoaded: boolean;
  setApeFigureLoaded: (val: boolean) => void;
}

const MainStoreContext = createContext<IState>({} as IState);

interface IProps {
  children: React.ReactNode;
}

const MainStore = ({ children }: IProps) => {
  const [apeFigureLoaded, setApeFigureLoaded] = useState(false);

  const value = {
    apeFigureLoaded,
    setApeFigureLoaded,
  };
  return (
    <MainStoreContext.Provider value={value}>
      {children}
    </MainStoreContext.Provider>
  );
};
const useMainStore = () => useContext(MainStoreContext);
export { MainStore, useMainStore };
