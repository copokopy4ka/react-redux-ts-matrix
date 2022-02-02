import React from "react";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
  }

const Button = ({children, ...props}: IButtonProps) => {
    return(
        <button {...props}>
            {children}
        </button>
    )
}

export default Button;