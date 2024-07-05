import React, { useState } from "react";
import styles from "./input.module.css";
import Button from "../../ui/Button";
import { numberWithCommas } from "../../ui/formatNumber";

const MaticInput = (props: any) => {
  const [validationError, setValidationError] = useState("");
  const validateInput = (value: string | number) => {
    const input = Number(value);
    switch (true) {
      case value && input > props.maxValue:
        return [
          props.maxValue,
          `Must be less than or equal to ${props.maxValue}`,
        ];
      case value && input < props.minValue:
        return [
          props.minValue,
          `Must be greater than or equal to ${props.minValue}`,
        ];
      default:
        return [value, ""];
    }
  };
  const handleCounter = (value: number) => {
    let updatedCount = Number(props.value) + value;
    const [valueFromValidation, error] = validateInput(updatedCount.toString());
    setValidationError(error);
    props.setValue(valueFromValidation);
  };
  return (
    <div className="mt-2 relative">
      <div className={`input-group flex ${styles.maticInput}`}>
        {/* <select className="matic-input select select-bordered min-h-[50px] !rounded-tl-[28px] focus:outline-none !bg-primary !rounded-bl-[28px] !rounded-tr-[0px] !rounded-br-[0px] border-primary min-w-[126px] text-base-100 text-lg font-semibold">
          <option selected>Matic</option>
        </select> */}
        <p className="min-h-[50px] !rounded-tl-[28px] !bg-primary !rounded-bl-[28px] !rounded-tr-[0px] !rounded-br-[0px] border-primary min-w-[126px] text-base-100 text-lg font-semibold text-center pt-[10px]">
          Matic
        </p>
        <input
          type="text"
          className="input disabled:!bg-inherit disabled:!cursor-default disabled:!text-[black] focus:outline-none input-bordered w-full !rounded-tr-[28px] !rounded-br-[28px] !rounded-tl-[0px] !rounded-bl-[0px] !border-slate-300 !h-[50px] border-l-0"
          value={numberWithCommas(props.price)}
          // onChange={handleInputChange} refer feature/Launchapd_Dao_sprint26 commit name : changes in buymembership and applayout date: 20/06/2024
          disabled
        />
        <div
          className={`${styles.maticActions} bg-base-100 absolute flex gap-3 items-center right-3.5 top-3.5`}
        >
          <Button
            type="plain"
            btnClassName={`${styles.minus} icon cursor-pointer`}
            handleClick={() => handleCounter(-1)}
          ></Button>
          <p className="text-lg font-medium text-secondary">
            {Number(props.value)}
          </p>
          <Button
            type="plain"
            btnClassName={`${styles.plus} icon cursor-pointer`}
            handleClick={() => handleCounter(1)}
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
