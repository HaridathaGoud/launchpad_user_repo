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
}: TextAreaProps) => {
  return (
    <div className={inputBoxClass}>
      <label
        className={
          labelClass || "text-secondary text-sm font-normal p-0 mb-2 label block"
        }
      >
        {label} {isRequired && <span className="text-[#ff0000]">*</span>}
      </label>
      <textarea
        aria-label="With textarea"
        value={value}
        onChange={(e) => onChange(fieldName, e.target.value)}
        className={
          inputClass ||
          "textarea textarea-bordered w-full text-secondary bg-transparent border-[#a5a5a5] resize-none leading-4 rounded-[28px] pl-5 pt-3 focus:outline-none"
        }
        rows={5}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        maxLength={maxLength}
      />
      {error && (
        <p className={errorClass || "text-sm font-normal text-red-600"}>
          {error}
        </p>
      )}
    </div>
  );
};

export default TextArea;
