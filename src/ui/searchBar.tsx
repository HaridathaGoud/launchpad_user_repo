import React, { useState } from "react";
import Button from "./Button";
interface SearchBarProps {
  onSearch: Function;
  inputRef: any;
  onInputChange?: Function;
  searchBarClass?: string;
  inputClass?: string;
  searchIconClass?: string;
  searchIconSize?: string;
  placeholder?:string,
}
const SearchBar = ({
  onSearch,
  inputRef,
  searchBarClass='',
  inputClass='',
  searchIconClass='',
  searchIconSize='',
  placeholder='',
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
          "w-full rounded-[28px] border-[#A5A5A5] h-[42px] border focus:outline-none pl-5 pr-12"
        }
      />
      <Button
        type="plain"
        handleClick={() => onSearch(userInput)}
        btnClassName={
          searchIconClass || "absolute right-4 top-2 cursor-pointer w-fit h-fit"
        }
      >
        <span className={`icon search ${searchIconSize || "md"} md:w-72`} />
      </Button>
    </div>
  );
};

export default SearchBar;
