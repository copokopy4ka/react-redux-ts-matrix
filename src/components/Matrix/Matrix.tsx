import { useDispatch, useSelector } from "react-redux";
import { setAverage } from "../../functions";
import { IDefaultState } from "../../store";
import MatrixRow from "../MatrixRow/MatrixRow";
import { addRow } from "../../functions";
import Button from "../UI/Button/Button";
import MatrixHeaderCell from "components/MatrixHeaderCell/MatrixHeaderCell";
import MatrixCell from "components/MatrixCell/MatrixCell";
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
                        <MatrixHeaderCell className="matrix__header-cell">№</MatrixHeaderCell>
                        {tableData[0].map((_: any, index: number) => {
                            newKey++;
                            return <MatrixHeaderCell
                                    className="matrix__header-cell"
                                    key={newKey}>
                                        {index + 1}
                                    </MatrixHeaderCell>
                        })}
                        <MatrixHeaderCell className="matrix__header-cell">Sum</MatrixHeaderCell>
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
                            <MatrixCell className="matrix__footer-cell">Avg</MatrixCell>
                            {setAverage(tableData).map(item => {
                                newKey++;
                                return <MatrixCell
                                        className="matrix__footer-cell"
                                        key={newKey}>
                                            {item}
                                        </MatrixCell>
                            })}
                            <MatrixCell className="matrix__footer-cell">
                                {setAverage(tableData).reduce((prev, el) => prev + el)}
                            </MatrixCell>
                        </tr>
                        : null
                    }
                </tbody>
            </table>
            <Button className="btn matrix__back-btn" onClick={() => backToFormHandler()}>{`<< Back`}</Button>
        </div>
    )
}

export default Matrix;