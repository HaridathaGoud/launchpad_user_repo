import React, { useMemo } from "react";
import useOutsideClick from "../hooks/useOutsideClick";
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
}
const getClass=(baseClass:string,newClass:string | undefined,addToBase:string | undefined)=>{
  let classToUpdate:string=baseClass;
  if(addToBase){
    classToUpdate=`${baseClass} ${addToBase}`
    return classToUpdate
  }
  return newClass || classToUpdate
}
const baseUlClass:string="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box min-w-[170px]";
const baseLiClass:string=""
const baseMenuBtnClass:string="block py-2 font-semibold text-base  hover:text-primary hover:bg-transparent"
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
  addToMenuBtnClass
}: DropdownPropsModal) {
  const { ref: menuRef } = useOutsideClick(handleAction);
  function handleAction(action: Function | undefined) {
    menuRef?.current?.removeAttribute("open");
    action?.();
  }
  const ulClass=useMemo(()=>{
    return getClass(baseUlClass,menuClass,addToMenuClass)
  },[menuClass,addToMenuClass])
  const liClass=useMemo(()=>{
    return getClass(baseLiClass,menuItemClass,addToMenuItemClass)
  },[menuItemClass,addToMenuItemClass])
  const btnClass=useMemo(()=>{
    return getClass(baseMenuBtnClass,menuBtnClass,addToMenuBtnClass)
  },[menuBtnClass,addToMenuBtnClass])
  const active=useMemo(()=>{
    return activeClass ||  "text-primary"
  },[activeClass])
  const inactive=useMemo(()=>{
    return inactiveClass ||  ""
  },[inactiveClass])
  return (
    <details className={`dropdown ${dropdownClass || ""}`} ref={menuRef}>
      <summary className="cursor-pointer marker:content-none p-0 bg-inherit border-0 hover:bg-transparent">
        {btnContent}
      </summary>
      <ul
        className={`${
          ulClass
        }`}
      >
        {dropdownList.map((dropdownContent: any) => (
          <li className={`${liClass}`} key={dropdownContent.name}>
            <button
              className={` ${
                btnClass
              } ${dropdownContent.isActive ? active : inactive}`}
              onClick={() => handleAction(dropdownContent.action)}
            >
              {dropdownContent.image && (
                <img
                  src={dropdownContent.image}
                  alt={dropdownContent.name}
                  className="mx-auto"
                />
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
