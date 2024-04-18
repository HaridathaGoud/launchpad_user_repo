import React from "react";
import useOutsideClick from "../hooks/useOutsideClick";

function DropdownMenus({ btnContent, dropdownList,dropdownClass,menuwidth,dropdownListClass,btnCenter,borderList }) {
  const { ref: menuRef } = useOutsideClick(handleAction);
  function handleAction(action) {
    menuRef?.current?.removeAttribute("open");
    action?.();
  }
  return (
    <details className={`dropdown ${dropdownClass}`} ref={menuRef}>
      <summary className="cursor-pointer marker:content-none p-0 bg-inherit border-0 hover:bg-transparent">
        {btnContent}
      </summary>
      <ul className={`p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box min-w-[170px] ${menuwidth}`}>
        {dropdownList.map((dropdownContent) => (
          <li
          className={`${borderList}`}
            key={dropdownContent.name} 
          >
            <button
               className={`block py-2 font-semibold text-base  hover:text-primary hover:bg-transparent ${dropdownListClass} ${btnCenter} ${
                dropdownContent.isActive ? "text-primary" : "bg-transparent"
              }`}
              onClick={() => handleAction(dropdownContent.action)}
            >
               {dropdownContent.image && (
                <img
                  src={dropdownContent.image}
                  alt={dropdownContent.name}
                  className="mx-auto"  />
              )}
              {dropdownContent.name}
            </button>
          </li>
        ))}
      </ul>
    </details>
  );
}

export default DropdownMenus;
