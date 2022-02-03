import { createStore } from "redux";

export interface IDefaultState {
    userInput: {
        rows: number | string,
        cols: number | string,
        closest: number | string,
        setMatrix: boolean
    }
    matrixArr: any[];
}

interface IAction {
    type: string;
    payload?: any;
}

const defaultState: IDefaultState = {
    userInput: {
        rows: '',
        cols: '',
        closest: '',
        setMatrix: false
    },
    matrixArr: []
}

const reducer = (state = defaultState, action: IAction) => {
    switch(action.type) {
        case 'SET_START_STATE':
            return {...state, ...action.payload};
        case 'RESET_STATE':
            return {...state, matrixArr: [...action.payload]};
        case 'REGENERATE_MATRIX':
            return {...state, ...action.payload};
        default:
            return state;
    }
}

export const store = createStore(reducer)