import React, { ReactNode } from "react";
import { images } from "../../consts";
import Button from "../Button";
import PopupContainer from "../PopupContainer";

interface IProps {
  tryAgain?: () => void;
  close?: () => void;
  content: string | ReactNode;
}

function Error({ tryAgain, close = () => {}, content }: IProps) {
  return (
    <PopupContainer close={close} id="error">
      <div className="error-content">
        <button className="error-content-close" onClick={close}>
          <img src={images.close} alt="close" />
        </button>
        <section className="error-content-message">{content}</section>
        {tryAgain && <Button content="Try again" onClick={tryAgain} />}
      </div>
    </PopupContainer>
  );
}

export default Error;
