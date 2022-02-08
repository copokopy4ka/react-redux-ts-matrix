import React from "react";

export interface IMatrixCell {
    className?: string;
    children?: any;
    style?: any;
    id?: string;
    onMouseEnter?: (e: any) => void;
    onMouseLeave?: (e: any) => void;
    onClick?: (e: any) => void;
}

const MatrixCell = ({children, ...props}: IMatrixCell) => {

    return (
        <td {...props}>
            {children}
        </td>
    )
}

export default MatrixCell;