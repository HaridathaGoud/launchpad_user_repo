import React, { useState } from "react";
import Button from "./Button";
interface SearchBarProps {
  onSearch: Function;
  inputRef: any;
  searchBarClass?: string;
  inputClass?: string;
  searchIconClass?: string;
  searchIconSize?: string;
  placeholder?:string,
  disabled?:boolean;
}
const SearchBar = ({
  onSearch,
  inputRef,
  searchBarClass='',
  inputClass='',
  searchIconClass='',
  searchIconSize='',
  placeholder='',
  disabled=false
}: SearchBarProps) => {
  const [userInput, setUserInput] = useState("");
  const handleSearch = (e: any) => {
    let value = e.target.value.trim();
    setUserInput(value);
    if (e.key === "Enter" && value) {
      onSearch(value);
      return;
    }
    if (e.key === "Backspace" && !value) {
      onSearch(null);
    }
  };
  return (
    <div className={searchBarClass || "relative max-sm:mt-4"}>
      <input
        type="text"
        placeholder={placeholder ||"Search by project name"} 
        onKeyUp={handleSearch}
        ref={inputRef}
        className={
          inputClass ||
          "w-full rounded-[28px] border-[#e0e0e0] h-[44px] border focus:outline-none pr-5 pl-12"
        }
        disabled={disabled}
      />
      <Button
        type="plain"
        handleClick={() => onSearch(userInput)}
        btnClassName={
          searchIconClass || "absolute left-4 top-2 cursor-pointer w-fit h-fit"
        }
      >
        <span className={`icon search ${searchIconSize || "md"} md:w-72`} />
      </Button>
    </div>
  );
};

export default SearchBar;
