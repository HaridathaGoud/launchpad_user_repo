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
  inputInfo?:string,
  inputInfoClass?:string,
  disabled?:boolean
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
  inputInfo,
  inputInfoClass,
  disabled
}:TextInputProps) => {

  return (
    <div className={inputBoxClass}>
    {label &&  <label
        className={
          labelClass || "text-secondary text-sm font-normal p-0 mb-2 label block ml-3"
        }
      >
        {label} {isRequired && <span className="text-[#ff0000]">*</span>}
      </label>}
      {inputInfo && <p className={inputInfoClass ||"text-secondary opacity-60 ml-3 mb-[10px]"}>{inputInfo}</p>}
      <input
        name={fieldName}
        type={inputType}
        placeholder={placeholder || `Enter ${label.toLowerCase()}`}
        className={
          inputClass ||
          "input input-bordered w-full bg-transparent text-secondary rounded-[12px] border-[#A5A5A5] focus:outline-none pl-4 h-10"
        }
        value={value}
        onChange={(e) => onChange(fieldName, e.target.value)}
        onKeyUp={onKeyUp ? (e:any)=>onKeyUp(fieldName,e) : ()=>{}}
        maxLength={maxLength}
        onBlur={(e) => onChange(fieldName, e.target.value?.trim() || '')}
        disabled={disabled}
      />
      {error && (
        <p className={errorClass || "text-sm font-normal text-red-600 ml-3"}>
          {error}
        </p>
      )}
    </div>
  );
};

export default TextInput;
