import { ReactNode } from "react";
import { images } from "../../../consts";

interface ControllerActionProps {
  prev: () => void;
  next: () => void;
  text: string | ReactNode;
}

const ControllerAction = ({ prev, next, text }: ControllerActionProps) => {
  return (
    <section className="game-controller-section">
      <button
        onClick={prev}
        className="game-controller-section-arrow game-controller-section-arrow-left"
      >
        <img src={images.arrow} alt="arrow" />
      </button>
      <p className="game-controller-section-title">{text}</p>
      <button
        onClick={next}
        className="game-controller-section-arrow game-controller-section-arrow-right"
      >
        <img src={images.arrow} alt="arrow" />
      </button>
    </section>
  );
};

export default ControllerAction;
