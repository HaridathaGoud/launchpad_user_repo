import React from "react";
interface TextAreaProps {
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
  inputInfo?: string;
  inputInfoClass?: string;
  rows?:number;
  disabled?:boolean;
}
const TextArea = ({
  label,
  fieldName,
  value,
  onChange,
  error,
  maxLength = 4000,
  isRequired = true,
  placeholder,
  inputBoxClass,
  labelClass,
  inputClass,
  errorClass,
  inputInfo,
  inputInfoClass,
  rows,
  disabled
}: TextAreaProps) => {
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
      {inputInfo && (
        <p className={inputInfoClass || "text-secondary opacity-60 "}>
          {inputInfo}
        </p>
      )}
      <textarea
        aria-label="With textarea"
        value={value}
        onChange={(e) => onChange(fieldName, e.target.value)}
        className={
          inputClass ||
          "textarea textarea-bordered w-full disabled:bg-transparent text-secondary bg-transparent border-[#a5a5a5] resize-none leading-4 rounded-[28px] pl-5 pt-3 focus:outline-none"
        }
        rows={rows || 5}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        maxLength={maxLength}
        disabled={disabled}
        onBlur={(e) => onChange(fieldName, e.target.value?.trim() || '')}
      />
      {error && (
        <p className={errorClass || "text-sm font-normal text-red-600 ml-3"}>
          {error}
        </p>
      )}
    </div>
  );
};

export default TextArea;
