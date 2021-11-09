import { ReactNode } from "react";

interface IProps {
  close?: () => void;
  children: ReactNode;
  id?: string;
  showOnlyChildren?: boolean;
}

function PopupContainer({
  close,
  children,
  id = "",
  showOnlyChildren,
}: IProps) {
  return showOnlyChildren ? (
    <>{children}</>
  ) : (
    <div className="popup-container" id={id}>
      <section
        className="popup-container-overlay"
        onClick={() => close && close}
      ></section>
      {children}
    </div>
  );
}

export default PopupContainer;
