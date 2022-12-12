import { useReducer } from 'react'


type Action = | {type: 'Finished Game', payload: string[][]} | {type: 'updateBoard', payload: string[][]};

export default function reducer(state: string[][], action: Action):string[][] {
    switch(action.type){
        case 'updateBoard': return [...action.payload];
        case 'Finished Game': return action.payload;
        default: return state;
    };
};

export function useGameReducer(initialState:string[][]){
    return useReducer(reducer, initialState)
};