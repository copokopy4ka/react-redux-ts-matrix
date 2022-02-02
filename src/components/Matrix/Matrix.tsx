import { useDispatch, useSelector } from "react-redux";
import { setAverage } from "../../functions";
import { IDefaultState } from "../../store";
import MatrixRow from "../MatrixRow/MatrixRow";
import { addRow } from "../../functions";
import Button from "../UI/Button/Button";
import './matrix.css'


const Matrix = () => {
    const dispatch = useDispatch();
    const state = useSelector((state: IDefaultState) => state);
    let newKey = Date.now()
    const tableData = state.matrixArr;
    const matrixClasses: string[] = ['matrix'];
    

    const addRowHandler = (rowCreator: (num: number) => any[], rowLength: any) => {
        let newRow = rowCreator(rowLength)
        tableData.unshift(newRow)
        dispatch({type: 'RESET_STATE', payload: tableData});
    }

    const backToFormHandler = () => {
        state.userInput.closest = '';
        state.userInput.cols = '';
        state.userInput.rows = '';
        state.matrixArr = [];
        state.userInput.setMatrix = !state.userInput.setMatrix
        dispatch({type: 'REGENERATE_MATRIX', payload: state})
    }

    if (!state.userInput.setMatrix) {
        matrixClasses.push('hidden')
    }

    return (
        <div className={matrixClasses.join(' ')}>
            <Button className="btn matrix__add-row-btn" onClick={(e) => addRowHandler(addRow, state.userInput.cols)}>Add row</Button>
            <table>
                <thead>
                    {tableData.length ?
                    <tr>
                        <th className="matrix__header-cell">№</th>
                        {tableData[0].map((_: any, index: number) => {
                            newKey++;
                            return <th
                                    className="matrix__header-cell"
                                    key={newKey}>
                                        {index + 1}
                                    </th>
                        })}
                        <th className="matrix__header-cell">Sum</th>
                    </tr>
                    :
                    null}
                </thead>
                <tbody>
                    {tableData.map((item, index) => {
                        newKey++;
                        return <MatrixRow key={newKey} cellsArr={item} index={index} />
                    })}
                    {tableData.length
                        ? <tr>
                            <td className="matrix__footer-cell">Avg</td>
                            {setAverage(tableData).map(item => {
                                newKey++;
                                return <td
                                        className="matrix__footer-cell"
                                        key={newKey}>
                                            {item}
                                        </td>
                            })}
                            <td className="matrix__footer-cell">
                                {setAverage(tableData).reduce((prev, el) => prev + el)}
                            </td>
                        </tr>
                        :
                        null
                    }
                </tbody>
            </table>
            <Button className="btn matrix__back-btn" onClick={() => backToFormHandler()}>{`<< Back`}</Button>
        </div>
    )
}

export default Matrix;