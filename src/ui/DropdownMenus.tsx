import React, { useMemo, useState } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
import Button from "./Button";
interface DropdownPropsModal {
  btnContent: any;
  dropdownList: any;
  dropdownClass?: string;
  menuClass?: string;
  menuItemClass?: string;
  menuBtnClass?: string;
  activeClass?: string;
  inactiveClass?: string;
  addToMenuClass?: string;
  addToMenuItemClass?: string;
  addToMenuBtnClass?: string;
  isHover?: boolean;
}
const getClass = (
  baseClass: string,
  newClass: string | undefined,
  addToBase: string | undefined
) => {
  let classToUpdate: string = baseClass;
  if (addToBase) {
    classToUpdate = `${baseClass} ${addToBase}`;
    return classToUpdate;
  }
  return newClass || classToUpdate;
};
const baseUlClass: string =
  "p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box min-w-[170px]";
const baseLiClass: string = "";
const baseMenuBtnClass: string =
  "block py-2 font-semibold text-base  hover:text-primary ";
function DropdownMenus({
  btnContent,
  dropdownList,
  dropdownClass,
  menuClass,
  menuItemClass,
  menuBtnClass,
  activeClass,
  inactiveClass,
  addToMenuClass,
  addToMenuItemClass,
  addToMenuBtnClass,
  isHover,
}: DropdownPropsModal) {
  const [isOpen, setIsOpen] = useState(false);
  const { ref: menuRef } = useOutsideClick(handleAction);
  function handleAction(action: Function | undefined) {
    setIsOpen(false);
    action?.();
  }
  const ulClass = useMemo(() => {
    return getClass(baseUlClass, menuClass, addToMenuClass);
  }, [menuClass, addToMenuClass]);
  const liClass = useMemo(() => {
    return getClass(baseLiClass, menuItemClass, addToMenuItemClass);
  }, [menuItemClass, addToMenuItemClass]);
  const btnClass = useMemo(() => {
    return getClass(baseMenuBtnClass, menuBtnClass, addToMenuBtnClass);
  }, [menuBtnClass, addToMenuBtnClass]);
  const active = useMemo(() => {
    return activeClass || "text-primary";
  }, [activeClass]);
  const inactive = useMemo(() => {
    return inactiveClass || "";
  }, [inactiveClass]);
  return (
    <div className="p-0 hover:bg-transparent">
      {!isHover && (
        <div  
          className={`dropdown ${dropdownClass || ""} ${
            isOpen ? "dropdown-open" : ""
          }`}
          ref={menuRef}
        >
          <button  onClick={() => setIsOpen(prev=>!prev)} className="cursor-pointer marker:content-none p-0 bg-inherit border-0 hover:bg-transparent">
            {btnContent}
          </button>
          {isOpen && (
            <ul className={`${ulClass}`}>
              {dropdownList.map((dropdownContent: any) => (
                <li className={`${liClass}`} key={dropdownContent.name}>
                  <button
                    className={`app-launch-card ${btnClass} ${
                      dropdownContent.isActive ? active : inactive
                    }`}
                    onClick={() => handleAction(dropdownContent.action)}
                  >
                    <div className="flex items-center gap-3 ">
                    {dropdownContent.image && (
                      <img
                        src={dropdownContent.image}
                        alt={dropdownContent.name}
                        // className="mx-auto"
                      />
                    )}
                   <p className="mb-0 text-neutral hover:text-primary"> {dropdownContent.name}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {isHover && (
        <button
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          onClick={() => setIsOpen(false)}
          className={`dropdown !hover:bg-transparent ${
            isOpen ? "dropdown-open" : ""
          }`}
        >
          <div className="hover:!bg-transparent">{btnContent}</div>
          {isOpen && (
            <ul className="dropdown-content ml-0 z-[1] menu bg-base-100 shadow  rounded-box w-52 menu-subdropdown">
              {dropdownList.map((dropdownContent: any) => (
                <li className={``} key={dropdownContent.name}>
                  <button
                    className={`!text-left ${btnClass} ${
                      dropdownContent.isActive ? active : inactive
                    }`}
                    onClick={() => handleAction(dropdownContent.action)}
                  >
                    {dropdownContent.image && (
                      <img
                        src={dropdownContent.image}
                        alt={dropdownContent.name}
                        className=""
                      />
                    )}
                    {/* <span className={`${dropdownContent.icon}`}></span> */}
                    {dropdownContent.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </button>
      )}
    </div>
  );
}

export default DropdownMenus;
