import { IDefaultState } from "../store";

let newId = Date.now()

const addCell = () => {
    const newCeil = {
        id: newId,
        amount: Math.floor(Math.random() * (1000 - 100) + 100),
        isClosest: false,
        isAmountInPercent: false,
        percentage: 0,
        showPercentage: 0,
    }
    
    newId++;

    return newCeil;
}

export const addRow = (cols: number | string) => {
    const rowArr = [];
    let cells = cols;
    let cellsSum: number = 0

    if (typeof cells === 'number') {
        while (cells > 0) {
            rowArr.push(addCell())
            cells--;
        }
    }

    cellsSum = rowArr.reduce((prev, item) => prev + item.amount, 0);
    rowArr.map(el => el.percentage = Math.round(el.amount / cellsSum * 100))

    return rowArr;
}

export const setMatrixArr = (rows: number | string, cols: number | string) => {
    const matrixArr = []
    let flag = rows;

    if (typeof flag === 'number') {
        while (flag > 0 ) {
            matrixArr.push(addRow(cols))
            flag--
        }
    }

    return matrixArr;
}

export const setAverage = (matrixData: any[]) => {
    const result: number[] = matrixData.length ? Array(matrixData[0].length).fill(0) : [];
    for (let i = 0; i < matrixData.length; i++) {
        matrixData[i].forEach((el: any, index: number) => result[index] += el.amount)
    }
    return result.map(el => Math.round(el / matrixData.length));
}

export const findClosest = (id: number, dataArr: IDefaultState) => {
    const cellsArr = Object.assign(dataArr.matrixArr.reduce((prev, el) => prev.concat(el), []));
    const sortedCeils = cellsArr.sort((a: any, b: any) => a.amount - b.amount);
    let current = 0;
    const closestNum = dataArr.userInput.closest;
    
    for (let i = 0; i < sortedCeils.length; i++) {
        if (sortedCeils[i].id === id) {
            current = i;
            break;
        }
    }
    
    let prev = current - 1;
    let next = current + 1;
    let closestArr: any[] = [];
    
    while(closestArr.length < closestNum) {
        if (!sortedCeils[prev]) {
            if(sortedCeils[next]) {
                closestArr.push(sortedCeils[next])
                next += 1;
            } else {
                break
            }
        } else if (!sortedCeils[next]) {
            if(sortedCeils[prev]){
                closestArr.push(sortedCeils[prev]);
                prev -= 1;
            } else {
                break
            }
        } else {
            if (sortedCeils[next].amount - sortedCeils[current].amount < sortedCeils[current].amount - sortedCeils[prev].amount) {
                closestArr.push(sortedCeils[next]);
                next += 1;
            } else if(sortedCeils[next].amount - sortedCeils[current].amount >= sortedCeils[current].amount - sortedCeils[prev].amount) {
                closestArr.push(sortedCeils[prev]);
                prev -= 1;
            }
        }
    }
    
    for (let arr of dataArr.matrixArr) {
        for (let cell of arr) {
            if (closestArr.find(item => item.id === cell.id)) {
                cell.isClosest = !cell.isClosest;
            }
        }
    }
    return dataArr.matrixArr
}

export const clearClosest = (dataArr: any[]) => {
    for (let arr of dataArr) {
        for (let cell of arr) {
            if (cell.isClosest) {
                cell.isClosest = !cell.isClosest;
            }
        }
    }
    return dataArr;
}