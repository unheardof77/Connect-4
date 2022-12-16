import { useReducer } from 'react'


type Action = | {type: 'Finished Game', payload: string[][]} | {type: 'updateBoard', payload: string[][]};

export interface ModalState {
    login: boolean;
    signup: boolean;
    winner: boolean;
}

export type modalAction = {type: 'showSignup'} | {type: 'hideSignup'} | {type: 'showLogin'} | {type: 'hideLogin'} | {type: 'showWinnerModal'} | {type: 'hideWinnerModal'}

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

export function modalReducer(state:ModalState, action:modalAction): ModalState{
    switch(action.type){
        case 'hideLogin': return {...state, login: false};
        case 'hideSignup': return {...state, signup: false};
        case 'showLogin': return {...state, login: true};
        case 'showSignup': return {...state, signup: true};
        case 'showWinnerModal': return {...state, winner: true};
        case 'hideWinnerModal': return {...state, winner: false}
        default: return state;
    }
};

export function useModalReducer(initialState:ModalState){
    return useReducer(modalReducer, initialState);
};