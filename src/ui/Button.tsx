import React from "react";
interface ButtonInterface {
  handleClick?: Function;
  btnClassName?: string;
  children?: any;
  type?: string;
  disabled?: any;
}
const BtnStylings = {
  primary: `btn lg:p-2 lg:px-6 rounded-[12px] border-solid  border-primary bg-primary hover:border-0 border-0 hover:bg-primary text-base-100 font-semibold text-base btn hover:opacity-80 h-[42px] !leading-5`,
  secondary:
    "btn px-[35px] py-2.5 rounded-[12px] border-solid  border-secondary bg-secondary hover:border-0 border-0 hover:bg-secondary text-base-100 font-semibold text-base hover:opacity-80 h-[42px] !leading-5",
  cancel:
    "px-[35px] py-2.5 rounded-[12px] border border-secondary !dark:hover:bg-transparent bg-transparent hover:bg-black text-secondary hover:bg-secondary hover:text-black font-semibold text-base h-[46px] !leading-5",
  nav: "block py-2 font-semibold px-4 text-base hover:text-primary hover:bg-transparent",
  close: "modal-position me-1",
  cardButton:
    "bg-secondary font-semibold text-sm text-base-100 border-solid h-[30px]  px-3 rounded-[12px] h-[42px]",
  applynow:
    "h-[42px] lg:p-2 lg:px-[44px] rounded-[12px] border-solid  border-primary bg-primary hover:border-0 border-0 hover:bg-primary text-base-100 font-semibold text-base btn hover:opacity-80 !leading-5",
  stakingPrimary:
    "btn bg-primary rounded-[12px] border-solid  border-primary hover:border-0 border-0 lg:py-2 px-6 inline-block text-base font-semibold text-base-100 h-[42px] hover:opacity-80 hover:bg-primary",
  stakingDisabled:
    "bg-accent text-secondary rounded-[12px] lg:py-2 px-6 inline-block text-base font-semibold cursor-not-allowed h-[42px]",
    create:
    "bg-accent text-secondary rounded-[12px] lg:py-2 px-6 inline-block text-base font-semibold",
    reply: `!h-[32px] !min-h-[32px] lg:px-3 rounded-[12px] border-solid  border-primary bg-primary hover:border-0 border-0 hover:bg-primary text-base-100 font-semibold text-sm btn hover:opacity-80`,
    replyCancel: `cancel-btn-style !h-[32px] !min-h-[32px] lg:px-3 rounded-[12px] border border-secondary bg-transparent  hover:bg-black   hover:text-white text-secondary font-semibold text-sm btn `,
    plain:"bg-transparent border-0 text-white"
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
      className={`${
        type
          ? BtnStylings[type]
          : "lg:p-2 lg:px-3 rounded-[12px] border-solid  border-primary bg-primary hover:border-0 border-0 hover:bg-primary text-base-100 font-semibold text-sm btn"
      } ${btnClassName}`}
    >
      {children}
    </button>
  );
};

export default Button;
