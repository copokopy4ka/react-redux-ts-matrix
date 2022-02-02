import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IDefaultState } from "../../store";
import Button from "../UI/Button/Button";
import { findClosest, clearClosest } from "../../functions";

const MatrixRow = ({cellsArr, index}: {cellsArr: any[], index: number}) => {
    const dispatch = useDispatch();
    const store = useSelector((store: IDefaultState) => store);
    let newKey = Date.now();
    const cellsSum = cellsArr.reduce((prev, item) => prev += item.amount, 0)
    const cellsClasses: string[] = ['matrix__cell'];

    const removeRow = () => {
        const newArr = store.matrixArr.filter((_, i)=> i !== index);
        store.matrixArr = newArr;
        dispatch({type: 'RESET_STATE', payload: store.matrixArr})
    }

    const increaseCeilValue = (e: React.MouseEvent, rowArr: any[], id: number) => {
        rowArr.find(ceil => Object.values(ceil).includes(id)).amount += 1;
        let cellsSum = rowArr.reduce((prev, item) => prev + item.amount, 0);
        rowArr.map(el => el.percentage = Math.round(el.amount / cellsSum * 100))
        dispatch({type: 'RESET_STATE', payload: store.matrixArr});
    }

    const setClosest = (e: React.MouseEvent) => {
        const payload = findClosest(+e.currentTarget.id, store)
        dispatch({type: 'RESET_STATE', payload: payload})
    }

    const resetClosest = () => {
        const payload = clearClosest(store.matrixArr)
        dispatch({type: 'RESET_STATE', payload: payload})
    }

    const setPercentage = (id: number) => {
        store.matrixArr.map(arr => {
            if (arr.find((cell: any) => cell.id === id)) {
                arr.map((item: any) => item.isAmountInPercent = !item.isAmountInPercent);
            }
        });
        dispatch({type: 'RESET_STATE', payload: store.matrixArr})
    }

    const resetPercentage = () => {
        for (let arr of store.matrixArr) {
            arr.map((el: any) => {
                if (el.isAmountInPercent) {
                    el.isAmountInPercent = !el.isAmountInPercent;
                }
            })
        }
        dispatch({type: 'RESET_STATE', payload: store.matrixArr})
    }

    return (
        <tr>
            <td className="matrix__numbering">{index + 1}</td>
            {cellsArr.map(cell => {
                newKey++;
                return <td
                        style={cell.isAmountInPercent ? {background: `linear-gradient(0deg, rgba(255,0,0,1) 0%, rgba(255,0,0,1) ${cell.percentage}%, rgba(255,255,255,1) ${cell.percentage}%, rgba(255,255,255,1) 100%)`, borderRadius: '0'} : {}}
                        className={cell.isClosest
                            ? [...cellsClasses, 'closest'].join(' ')
                            : cell.isAmountInPercent
                            ? [...cellsClasses, 'show-persent'].join(' ')
                            : cellsClasses.join(' ')
                        }
                        id={cell.id}
                        onMouseEnter={(e) => setClosest(e)}
                        onMouseLeave={() => resetClosest()}
                        onClick={(e) => increaseCeilValue(e, store.matrixArr[index], +e.currentTarget.id)}
                        key={newKey}>
                            {cell.isAmountInPercent
                                ? `${cell.percentage}%`
                                : cell.amount}
                        </td>
            })}
            <td
                 className="matrix__sum"
                onMouseEnter={(e) => setPercentage(Number(e.currentTarget.previousElementSibling?.id))}
                onMouseLeave={() => resetPercentage()}>
                   {cellsSum}
            </td>
            <td><Button className="btn matrix__remove-row-btn" onClick={removeRow}>&times;</Button></td>
        </tr>
    )
}

export default MatrixRow;