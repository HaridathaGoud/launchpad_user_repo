import React from "react";
interface SelectProps {
  label: string;
  fieldName: string;
  value: string | any;
  onChange: Function;
  error: string | null | undefined;
  maxLength?: number;
  isRequired?: boolean;
  placeholder?: string;
  inputBoxClass: string;
  labelClass?: string;
  inputClass?: string;
  errorClass?: string;
  options: any[];
  optionText?: string;
  optionValue?: string;
  defaultOption?: string;
  inputInfo?: string;
  inputInfoClass?:string;
  disabled?:boolean;
}
const Select = ({
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
  options,
  optionText = "name",
  optionValue = "code",
  defaultOption,
  inputInfo,
  inputInfoClass,
  disabled
}: SelectProps) => {
  return (
    <div className={inputBoxClass}>
      {label && (
        <label
          className={
            labelClass ||
            "text-secondary text-sm font-normal p-0 mb-2 label block ml-3"
          }
        >
          {label} {isRequired && <span className="text-[#ff0000]">*</span>}
        </label>
      )}
      {inputInfo && <p className={inputInfoClass ||"text-secondary opacity-60 ml-3"}>{inputInfo}</p>}
      <select
        placeholder={placeholder || "Select option"}
        className={
          inputClass ||
          "input input-bordered w-full text-secondary rounded-[28px] border-[#A5A5A5] focus:outline-none pl-4 h-10 cursor-pointer"
        }
        value={value}
        onChange={(event) => {
          const selected = event.target.selectedOptions[0];
          const selectedObject = selected.dataset.value
            ? JSON.parse(selected.dataset.value)
            : null;
          onChange(fieldName, event.target.value, selectedObject);
        }}
        disabled={disabled}
      >
        {defaultOption && (
          <option value="" data-value={""}>
            {defaultOption}
          </option>
        )}
        {options.map((item: any) => (
          <option
            key={item[optionValue]}
            value={item[optionValue]}
            data-value={JSON.stringify(item)}
          >
            {item[optionText]}
          </option>
        ))}
      </select>
      {error && (
        <p className={errorClass || "text-sm font-normal text-red-600 ml-3"}>
          {error}
        </p>
      )}
    </div>
  );
};

export default Select;
