import React from "react";

export function modalActions(id, action) {
  const modal = document.getElementById(id);
  if (action === "open") {
    modal?.classList.add("modal-open");
    modal?.classList.remove("modal-close");
  } else {
    modal?.classList.add("modal-close");
    modal?.classList.remove("modal-open");
  }
}
export function Modal({ id, children,modalClass }) {
  return (
    <dialog id={id} className="modal">
      <div className={`modal-box w-11/12 max-w-2xl rounded-[15px] ${modalClass}`}>
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={() => modalActions(id, "close")}
          >
            ✕
          </button>
        </form>
        {children}
        <div className="modal-action"></div>
      </div>
    </dialog>
  );
}
