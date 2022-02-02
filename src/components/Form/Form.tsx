import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMatrixArr } from "../../functions";
import { IDefaultState } from "../../store";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import './form.css'

const Form = () => {
    const dispatch = useDispatch();
    const state = useSelector((state: IDefaultState) => state);
    const formClasses: string[] = ['matrix-form'];
    const [cols, setCols] = useState('');
    const [rows, setRows] = useState('');
    const [closest, setClosest] = useState('');

    const setNewState = (e: React.MouseEvent, payload: IDefaultState) => {
        state.userInput.rows = +rows;
        state.userInput.cols = +cols
        state.userInput.closest = +closest;
        if (state.userInput.cols && state.userInput.rows) {
            state.matrixArr = [...state.matrixArr, ...setMatrixArr(state.userInput.rows, state.userInput.cols)];
            state.userInput.setMatrix = true;
            dispatch({type: 'SET_START_STATE', payload: payload});
            setClosest('');
            setRows('');
            setCols('');
        }
    }

    if (state.userInput.setMatrix) {
        formClasses.push('hidden')
    }

    return (
        <form onSubmit={(e) => e.preventDefault()} className={formClasses.join(' ')}>
            <div className="matrix-form__inputs-wrapper">
                <h1 className="matrix-form__title">Matrix builder</h1>
                <div className="matrix-form__input-holder">
                    <label className="matrix-form__label" htmlFor="inputCols">Enter the number of columns</label>
                    <Input value={cols} className="matrix-form__input" onChange={(e) => setCols(e.target.value)} type="number" id="inputCols"/>
                </div>
                <div className="matrix-form__input-holder">
                    <label className="matrix-form__label" htmlFor="inputRows">Enter the number of rows</label>
                    <Input value={rows} className="matrix-form__input" onChange={(e) => setRows(e.target.value)} type="number" id="inputRows"/>
                </div>
                <div className="matrix-form__input-holder">
                    <label className="matrix-form__label" htmlFor="inputClosest">Enter the number of cells</label>
                    <Input value={closest} className="matrix-form__input" onChange={(e) => setClosest(e.target.value)} type="number" id="inputClosest"/>
                </div>
            </div>
            <Button className="btn matrix-form__create-btn" type="submit" onClick={(e) => setNewState(e, state)}>Create Matrix</Button>
        </form>
    )
}

export default Form;