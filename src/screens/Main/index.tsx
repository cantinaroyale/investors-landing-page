import { images } from "../../consts";
import { useMainStore } from "../../stores/MainStore/inde";
import ApeController from "./ApeController";
import ApeFigure from "./ApeFigure";
import GameVideo from "./GameVideo";
import Header from "./Header";
import NoNftError from "./NoNftError";

function Main() {
  const { background } = useMainStore();

  return (
    <div className="main">
      <NoNftError />
      <div
        className="main-top"
        style={{
          background: `linear-gradient(180deg, #000f34 0%, ${background} 91.65%)`,
        }}
      >
        <div className="main-top-grid">
          <Header />
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
