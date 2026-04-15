import React from "react";

type ButtonBaseProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  className?: string;
};

const ButtonBase = ({ children, className = "", ...buttonProps }: ButtonBaseProps) => {
  return (
    <button
      {...buttonProps}
      className={["px-6 py-3 rounded-full text-sm tracking-wide transition-colors hover:cursor-pointer", className ? className : "border border-[#7a5c3e] text-[#7a5c3e] hover:bg-[#e8dfd0]"].join(" ")}
    >
      {children}
    </button>
  );
};

export default ButtonBase;