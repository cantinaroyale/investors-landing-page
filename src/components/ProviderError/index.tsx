import { images } from "../../consts";
import PopupContainer from "../PopupContainer";

function ProviderError() {
  if ((window as any).ethereum) {
    return null;
  }

  return (
    <PopupContainer>
      <div className="provider-error-content">
        <h4>Failed to Load</h4>
        <p>
          Please open it from the{" "}
          <a href="https://metamask.io/"> Metamask Browser</a> for a better
          experience
        </p>
        <img
          src={images.metamask}
          alt="metamask"
          className="provider-error-content-img"
        />
      </div>
    </PopupContainer>
  );
}

export default ProviderError;
