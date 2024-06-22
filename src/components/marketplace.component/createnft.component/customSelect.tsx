import React, { useState } from "react";
import Button from "../../../ui/Button";
import useOutsideClick from "../../../hooks/useOutsideClick";

const CustomSelect = ({
  selectedValue,
  valueField,
  imageField,
  optionKey,
  hasImage,
  options,
  onSelect,
  placeholder,
  disabled,
}) => {
  const [isOpen,setIsOpen]=useState(false)
  const {ref:dropdownRef}=useOutsideClick(handleOutsideClick);
  function handleOutsideClick(){
    setIsOpen(false)
    dropdownRef?.current?.removeAttribute("dropdown-open");
  }
  const handleSelection=(option:any)=>{
    setIsOpen(false)
    dropdownRef?.current?.removeAttribute("dropdown-open");
    onSelect(option)
  }
  return (
    <div className={`dropdown dropdown-end w-full nft-dropdown`} ref={dropdownRef}>
      <div
        tabIndex={0}
        role="button"
        onClick={()=>{
          if(disabled) return;
          setIsOpen(true)
        }}
        className={`btn m-1 justify-start input input-bordered w-full rounded-[28px] bg-transparent hover:bg-transparent border-[#A5A5A5] focus:outline-none pl-4 h-10 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      >
        {selectedValue && hasImage && (
          <img
            className="scale-[0.8]"
            src={selectedValue?.[imageField]}
            alt={selectedValue?.[valueField]}
          />
        )}{" "}
        {selectedValue && <span className="text-secondary">{selectedValue?.[valueField]}</span>}
        {!selectedValue && <span className="text-base-200">{placeholder}</span>}
      </div>
     {isOpen && <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-full"
      >
        {options?.map((option: any) => {
          return (
            <li key={option[optionKey]}>
              <Button
                type="plain"
                btnClassName={"flex flex-row items-center gap-2"}
                handleClick={()=>handleSelection(option)}
              >
                {hasImage && (
                  <img
                    className="p-0 hover:bg-transparent scale-[0.8]"
                    src={option?.[imageField]}
                    alt={option?.[valueField]}
                  ></img>
                )}
                <p className="hover:bg-transparent p-0">{option?.[valueField]}</p>
              </Button>
            </li>
          );
        })}
      </ul>}
    </div>
  );
};

export default CustomSelect;
