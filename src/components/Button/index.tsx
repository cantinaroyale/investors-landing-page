import React, { ReactNode } from "react";
import Spinner from "../Spinner";

interface Props {
  content: ReactNode | string;
  isLoading?: boolean;
  id?: string;
  onClick: () => void;
  disabled?: boolean;
}

function Button({ content, isLoading, id = "", onClick, disabled }: Props) {
  return (
    <button
      style={{ pointerEvents: isLoading ? "none" : "all" }}
      onClick={isLoading ? () => {} : onClick}
      className={disabled ? "button button-disabled" : "button"}
      disabled={disabled}
      id={id}
    >
      {isLoading && <Spinner />}
      <p style={{ opacity: isLoading ? 0 : 1 }}>{content}</p>
    </button>
  );
}

export default Button;
