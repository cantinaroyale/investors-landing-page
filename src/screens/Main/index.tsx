import ApeController from "./ApeController";
import ApeFigure from "./ApeFigure";
import NftPreview from "./NftPreview";

function Main() {
  return (
    <div className="main">
      <div className="main-top">
        <NftPreview />
        <div className="main-top-grid">
          <div className="main-top-game">
            <ApeFigure />
            <ApeController />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
