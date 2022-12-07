import { useReducer } from 'react'


type Action = | {type: 'Finished Game', payload: string[][]}

export default function reducer(state: string[][], action: Action){
    switch(action.type){
        case 'Finished Game': return action.payload;
    };
};

export function useGameReducer(initialState:string[][]){
    return useReducer(reducer, initialState)
}