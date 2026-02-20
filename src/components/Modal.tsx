import React from "react";

type ModalProps = {
  title: string,
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

function Modal({ title, open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="absolute inset-0 grid place-items-center p-4">
        <div className="w-full max-w-md overflow-hidden rounded-none bg-[#161616] shadow-[10px_-8px_0px_black]">
          <div className="flex items-center justify-center px-5 mt-7">
            <h1 className="mono-font text-lg tracking-[0.25em] uppercase font-bold text-[#c7c0b1] text-center">
              {title}
            </h1>
          </div>

          <div className="p-6 text-center space-y-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
