import React from "react";
interface ModalProps {
  id: string;
  children: any;
  modalClass?: string;
  onClose?:Function;
  showClose?:boolean
}
export function modalActions(id:string, action:string,onModalAction?:Function) {
  const modal = document.getElementById(id);
  if (action === "open") {
    onModalAction?.(true)
    modal?.classList.add("modal-open");
    modal?.classList.remove("modal-close");
  } else {
    onModalAction?.(false)
    modal?.classList.add("modal-close");
    modal?.classList.remove("modal-open");
  }
}
export function Modal({ id, children, modalClass,onClose,showClose=true }: ModalProps) {
  return (
    <dialog id={id} className="modal">
      <div
        className={`modal-box w-11/12 max-w-2xl rounded-[15px] ${modalClass}`}
      >
        <form method="dialog" className="text-end">
          {showClose && <button
            className="icon close cursor-pointer"
            onClick={() => {
              onClose?.()
              modalActions(id, "close")}}
          >
          </button>}
        </form>
        {children}
        <div className="modal-action"></div>
      </div>
    </dialog>
  );
}
