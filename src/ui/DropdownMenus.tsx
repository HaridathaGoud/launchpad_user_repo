import React from "react";
import useOutsideClick from "../hooks/useOutsideClick";

function DropdownMenus({ btnContent, dropdownList }) {
  const { ref: menuRef } = useOutsideClick(handleAction);
  function handleAction(action) {
    menuRef?.current?.removeAttribute("open");
    action?.();
  }
  return (
    <details className="dropdown" ref={menuRef}>
      <summary className="cursor-pointer marker:content-none p-0 bg-inherit border-0 hover:bg-transparent">
        {btnContent}
      </summary>
      <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-[170px]">
        {dropdownList.map((dropdownContent) => (
          <li
            key={dropdownContent.name} 
          >
            <button
              className={`block py-2 font-semibold text-base  hover:text-primary hover:bg-transparent ${
                dropdownContent.isActive ? "text-primary" : "bg-transparent"
              }`}
              onClick={() => handleAction(dropdownContent.action)}
            >
              {dropdownContent.name}
            </button>
          </li>
        ))}
      </ul>
    </details>
  );
}

export default DropdownMenus;
