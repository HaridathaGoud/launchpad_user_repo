import React from "react";
interface TextInputProps{
    label:string,
  fieldName:string,
  value:string | any,
  onChange:Function,
  error:string | null | undefined,
  maxLength?:number,
  isRequired?:boolean,
  placeholder?:string,
  inputBoxClass:string,
  labelClass?:string,
  inputClass?:string,
  errorClass?:string,
  inputType?:string,
  onKeyUp?:Function,
}
const TextInput = ({
  label,
  fieldName,
  value,
  onChange,
  error,
  maxLength=50,
  isRequired=true,
  placeholder,
  inputBoxClass,
  labelClass,
  inputClass,
  errorClass,
  inputType='text',
  onKeyUp,
}:TextInputProps) => {

  return (
    <div className={inputBoxClass}>
      <label
        className={
          labelClass || "text-secondary text-sm font-normal p-0 mb-2 label block"
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
        value={value}
        onChange={(e) => onChange(fieldName, e.target.value)}
        onKeyUp={onKeyUp ? (e:any)=>onKeyUp(fieldName,e) : ()=>{}}
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

export default TextInput;
