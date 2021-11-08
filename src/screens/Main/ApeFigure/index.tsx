import { useEffect, useState } from "react";
import { Spinner } from "../../../components";

function ApeFigure() {
  const [isLoaded, setIsLoaded] = useState(false);
  console.log(window as any);
  useEffect(() => {
    (window as any).gameInstance.onProgress = (instance: any, p: any) => {
      if (p === 1) {
        setIsLoaded(true);
      }
    };
  }, []);

  return (
    <div className="ape">
      <div
        id="gameContainer"
        className="ape-figure"
        style={{ opacity: isLoaded ? 1 : 0, width: 570, height: 650 }}
      ></div>
      {!isLoaded && <Spinner />}
    </div>
  );
}

export default ApeFigure;
