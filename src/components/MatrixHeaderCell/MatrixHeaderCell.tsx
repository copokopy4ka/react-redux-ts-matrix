import React from "react";
import { IMatrixCell } from "components/MatrixCell/MatrixCell";

const MatrixHeaderCell = ({children, ...props}: IMatrixCell) => {

    return (
        <th {...props}>
            {children}
        </th>
    )
}

export default MatrixHeaderCell;