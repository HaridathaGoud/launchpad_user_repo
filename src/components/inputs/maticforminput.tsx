import React, { useEffect, useState } from "react";
import styles from "./input.module.css";
const MaticInput = ({value}) => {
  const [inputValue,setInputValue]=useState(0)
  const [count, setCount] = useState(0);
  useEffect(()=>{
    setInputValue(value)
    setCount(value)
  },[value])
  const updateCounter = () => {
    let updatedCount=count+1
    setCount(updatedCount);
    setInputValue(updatedCount)
  };
  const deCounter = () => {
    let updatedCount=count-1;
    setCount(updatedCount);
    setInputValue(updatedCount)
  };
  const handleInputChange=(e)=>{
    setInputValue(e.target.value)
  }
  return (
    <div className="mt-2 relative">
      <div className={`input-group flex ${styles.maticInput}`}>
        <select className="matic-input select select-bordered min-h-[50px] !rounded-tl-[28px] focus:outline-none !bg-primary !rounded-bl-[28px] !rounded-tr-[0px] !rounded-br-[0px] border-primary min-w-[126px] text-base-100 text-lg font-semibold">
          <option selected>Matic</option>
          <option>Crypto</option>
        </select>
        <input
          type="text"
          className="input focus:outline-none input-bordered w-full !rounded-tr-[28px] !rounded-br-[28px] !rounded-tl-[0px] !rounded-bl-[0px] !border-slate-300 !h-[50px] border-l-0"
          value={inputValue}
          onChange={handleInputChange}
        />
        <div
          className={`${styles.maticActions} bg-base-100 absolute flex gap-3 items-center right-3.5 top-3.5`}
        >
          <span
            className={`${styles.minus} icon cursor-pointer`}
            onClick={deCounter}
          ></span>
          <p className="text-lg font-medium text-secondary">{count}</p>
          <span
            className={`${styles.plus} icon cursor-pointer`}
            onClick={updateCounter}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default MaticInput;
