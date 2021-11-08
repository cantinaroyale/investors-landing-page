import React, { ReactNode } from "react";
import Spinner from "../Spinner";

interface Props {
  content: ReactNode | string;
  isLoading?: boolean;
  id?: string;
  onClick: () => void;
}

function Button({ content, isLoading, id = "", onClick }: Props) {
  return (
    <button onClick={onClick} className="button" id={id}>
      {isLoading && <Spinner />}
      <p style={{ opacity: isLoading ? 0 : 1 }}>{content}</p>
    </button>
  );
}

export default Button;
