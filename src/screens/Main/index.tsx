import { useCallback, useState } from "react";
import { DEFAULT_BACKGROUND_COLOR, images } from "../../consts";
import ApeController from "./ApeController";
import ApeFigure from "./ApeFigure";
import GameVideo from "./GameVideo";
import Header from "./Header";

function Main() {
  const [background, setBackground] = useState(DEFAULT_BACKGROUND_COLOR);

  const updateBackground = useCallback((color: string) => {
    setBackground(color);
  }, []);

  return (
    <div className="main">
      <div
        className="main-top"
        style={{
          background: `linear-gradient(180deg, #000f34 0%, ${background} 91.65%)`,
        }}
      >
        <div className="main-top-grid">
          <Header updateBackground={updateBackground} />
          <div className="main-top-game">
            <ApeFigure />
            <ApeController />
          </div>
        </div>
        <img
          src={images.bottomFigure}
          alt="figure"
          className="main-top-figure"
        />
      </div>
      <GameVideo />
    </div>
  );
}

export default Main;
