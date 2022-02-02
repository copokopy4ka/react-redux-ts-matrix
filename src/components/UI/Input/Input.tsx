import React from "react";

interface IInputTypes extends React.InputHTMLAttributes<HTMLInputElement> {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({...props}: IInputTypes) => {
    return (
        <input {...props}/>
    )
}

export default Input;