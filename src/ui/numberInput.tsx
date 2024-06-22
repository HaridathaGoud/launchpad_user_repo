import React, { useState } from "react";
interface NumberInputProps {
  label: string;
  fieldName: string;
  value: string | any;
  onChange: Function;
  error: string | null | undefined;
  isRequired?: boolean;
  placeholder?: string;
  inputBoxClass: string;
  labelClass?: string;
  inputClass?: string;
  errorClass?: string;
  inputType?: string;
  maxDecimals?:number;
  isInteger?:boolean;
  disabled?:boolean;
}
const decimalRegex=/^\d{1,}(\.\d{0,2})?$/
const integerRegex=/^\d+$/
const NumberInput = ({
  label,
  fieldName,
  value,
  onChange,
  error,
  isRequired = true,
  placeholder,
  inputBoxClass,
  labelClass,
  inputClass,
  errorClass,
  isInteger,
  disabled,
  inputType = "text",
}: NumberInputProps) => {
  const [cleanedValue, setCleanedValue] = useState("");
  const handleChange = (e: any) => {
    const cleanedValue = e.target.value.replace(/,/g, "");
    let formattedValue=cleanedValue;
    if(isInteger){
      const [wholePart, decimalPart] = cleanedValue.split(".");
      const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      formattedValue =
        decimalPart !== undefined
          ? `${formattedWholePart}.${decimalPart}`
          : formattedWholePart;
    }
    const regex=isInteger ? integerRegex:decimalRegex
    if (!cleanedValue || cleanedValue.match(regex)) {
      setCleanedValue(formattedValue);
      onChange?.(fieldName, cleanedValue);
    }
  };
  return (
    <div className={inputBoxClass}>
      <label
        className={
          labelClass ||
          "text-secondary text-sm font-normal p-0 mb-2 label block"
        }
      >
        {label} {isRequired && <span className="text-[#ff0000]">*</span>}
      </label>
      <input
        name={fieldName}
        type={inputType}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        className={
          inputClass ||
          "input input-bordered w-full bg-transparent text-secondary rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
        }
        value={cleanedValue}
        onChange={handleChange}
        disabled={disabled}
      />
      {error && (
        <p className={errorClass || "text-sm font-normal text-red-600"}>
          {error}
        </p>
      )}
    </div>
  );
};

export default NumberInput;
