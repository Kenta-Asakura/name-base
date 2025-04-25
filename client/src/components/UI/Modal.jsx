import { useRef } from "react";

function Modal({ children, onClose }) {
  const overlayRef = useRef(null);

  // ! Debug
  const handleOutsideClick = (e) => {
    e.target === overlayRef.current && onClose();
  };

  return (
    <div
      ref={overlayRef}
      className="fixed z-[500] inset-0
        flex justify-center items-center
        bg-black bg-opacity-30"
      onClick={handleOutsideClick}
    >
      {children}
    </div>
  )
};

export default Modal;
