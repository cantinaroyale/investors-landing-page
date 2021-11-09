import { useEffect } from "react";
import { Spinner } from "../../../components";
import { useMainStore } from "../../../stores/MainStore/inde";

function ApeFigure() {
  const { apeFigureLoaded, setApeFigureLoaded } = useMainStore();
  useEffect(() => {
    (window as any).gameInstance.onProgress = (instance: any, p: any) => {
      if (p === 1) {
        setApeFigureLoaded(true);
      }
    };
  }, [setApeFigureLoaded]);

  return (
    <div className="ape">
      <div
        id="gameContainer"
        className="ape-figure"
        style={{ opacity: apeFigureLoaded ? 1 : 0, width: 1140, height: 1300 }}
      ></div>
      {!apeFigureLoaded && <Spinner />}
    </div>
  );
}

export default ApeFigure;
