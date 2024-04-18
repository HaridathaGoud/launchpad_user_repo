import React, { useEffect, useState } from "react";
import styles from "./input.module.css";
import Button from "../../ui/Button";
const MaticInput = ({value,maxValue,minValue}) => {
  const [inputValue,setInputValue]=useState(0)
  const [validationError,setValidationError]=useState('')
  useEffect(()=>{
    setInputValue(value)
  },[value])
  const validateInput=(value:string | number)=>{
    const input=Number(value)
    switch(true){
      case value && input>maxValue:
        return [maxValue,`Must be less than or equal to ${maxValue}`]
      case value && input<minValue:
        return [minValue,`Must be greater than or equal to ${minValue}`]
      default:
        return [value,'']
    }
  }
  const handleCounter=(value:number)=>{
    let updatedCount=Number(inputValue)+value;
    const [valueFromValidation,error]=validateInput(updatedCount.toString());
     setValidationError(error)
    setInputValue(valueFromValidation)
  }
  const notNumber=(value)=>{
    return /^[0-9\s]*$/.test(value)
  }
  const handleInputChange=(e:any)=>{
    const value=e.target.value
    if(!notNumber(value)) return;
    const [valueFromValidation,error]=validateInput(value);
    setValidationError(error)
    setInputValue(valueFromValidation)
  }
  return (
    <div className="mt-2 relative">
      <div className={`input-group flex ${styles.maticInput}`}>
        {/* <select className="matic-input select select-bordered min-h-[50px] !rounded-tl-[28px] focus:outline-none !bg-primary !rounded-bl-[28px] !rounded-tr-[0px] !rounded-br-[0px] border-primary min-w-[126px] text-base-100 text-lg font-semibold">
          <option selected>Matic</option>
        </select> */}
        <p className="min-h-[50px] !rounded-tl-[28px] !bg-primary !rounded-bl-[28px] !rounded-tr-[0px] !rounded-br-[0px] border-primary min-w-[126px] text-base-100 text-lg font-semibold text-center pt-[10px]">Matic</p>
        <input
          type="text"
          className="input focus:outline-none input-bordered w-full !rounded-tr-[28px] !rounded-br-[28px] !rounded-tl-[0px] !rounded-bl-[0px] !border-slate-300 !h-[50px] border-l-0"
          value={inputValue}
          onChange={handleInputChange}
        />
        <div
          className={`${styles.maticActions} bg-base-100 absolute flex gap-3 items-center right-3.5 top-3.5`}
        >
          <Button
            type="plain"
            btnClassName={`${styles.minus} icon cursor-pointer`}
            handleClick={()=>handleCounter(-1)}
          ></Button>
          <p className="text-lg font-medium text-secondary">{Number(inputValue)}</p>
          <Button
            type="plain"
            btnClassName={`${styles.plus} icon cursor-pointer`}
            handleClick={()=>handleCounter(1)}
          ></Button>
        </div>
      </div>
      {validationError && (
              <label className="text-sm font-normal text-red-600 ml-4">
                {validationError}
              </label>
            )}
    </div>
  );
};

export default MaticInput;
