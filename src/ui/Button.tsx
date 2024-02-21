import React from "react";
interface ButtonInterface {
  handleClick?: Function;
  btnClassName?: string;
  children?: any;
  type?: string;
  disabled?: any;
}
const BtnStylings = {
  primary: `h-[30px] lg:p-2 lg:px-6 rounded-[33px] border-solid  border-primary bg-primary hover:border-0 border-0 hover:bg-primary text-base-100 font-semibold text-base btn hover:opacity-80 h-[42px]  !leading-5`,
  secondary:
    "px-[35px] py-2.5 rounded-[33px] border-solid  border-secondary bg-secondary hover:border-0 border-0 hover:bg-secondary text-base-100 font-semibold text-base hover:opacity-80 h-[42px] !leading-5",
  cancel:
    "px-[35px] py-2.5 rounded-[33px] border border-secondary bg-transparent hover:bg-black text-dark hover:bg-secondary hover:text-base-100 font-semibold text-[18px] h-[42px] !leading-5",
  nav: "block py-2 font-semibold px-4 text-base hover:text-primary hover:bg-transparent",
  close: "modal-position me-1",
  cardButton:
    "bg-secondary font-semibold text-sm text-base-100 border-solid h-[30px]  px-3 rounded-[33px] h-[42px]",
  applynow:
    "h-[42px] lg:p-2 lg:px-[44px] rounded-[33px] border-solid  border-primary bg-primary hover:border-0 border-0 hover:bg-primary text-base-100 font-semibold text-base btn hover:opacity-80 !leading-5",
  stakingPrimary:
    "bg-primary rounded-[28px] lg:py-2 px-6 inline-block text-base font-semibold text-base-100",
  stakingDisabled:
    "bg-accent text-secondary rounded-[33px] lg:py-2 px-6 inline-block text-base font-semibold cursor-not-allowed",
    create:
    "bg-accent text-secondary rounded-[33px] lg:py-2 px-6 inline-block text-base font-semibold",
    reply: `!h-[32px] !min-h-[32px] lg:px-3 rounded-[28px] border-solid  border-primary bg-primary hover:border-0 border-0 hover:bg-primary text-base-100 font-semibold text-sm btn hover:opacity-80`,
    replyCancel: `!h-[32px] !min-h-[32px] lg:px-3 rounded-[28px] border-solid  border-[#DFDBDB] bg-[#DFDBDB] hover:border-0 border-0 hover:bg-[#DFDBDB] text-secondary font-semibold text-sm btn hover:opacity-80`,
};
const Button = ({
  handleClick,
  children,
  type,
  btnClassName,
  disabled,
}: ButtonInterface) => {
  return (
    <button
      type="button"
      onClick={(e) => handleClick?.(e)}
      disabled={disabled}
      className={`${btnClassName} ${
        type
          ? BtnStylings[type]
          : " lg:p-2 lg:px-3 rounded-[33px] border-solid  border-primary bg-primary hover:border-0 border-0 hover:bg-primary text-base-100 font-semibold text-sm btn"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
