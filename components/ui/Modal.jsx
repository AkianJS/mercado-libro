import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

function Modal({ children, show }) {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = show ? (
    <div className="w-[100vw] h-[100vh] bg-slate-900 bg-opacity-60 fixed top-0 z-[1000] flex items-center justify-center overflow-hidden duration-200">
      {children}
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}

export default Modal;
