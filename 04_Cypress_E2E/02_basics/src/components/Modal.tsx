import React from "react";

import "./Modal.scss";

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }): JSX.Element {
  return (
    <React.Fragment>
      <div className="backdrop" onClick={onClose}></div>
      <dialog className="modal" open>
        {children}
      </dialog>
    </React.Fragment>
  );
}

export default Modal;
