import { useReducer } from 'react'
import { ModalState, ModalAction } from '../types/types';







export function modalReducer(state:ModalState, action:ModalAction): ModalState{
    switch(action.type){
        case 'hideLogin': return {...state, login: false};
        case 'hideSignup': return {...state, signup: false};
        case 'showLogin': return {...state, login: true};
        case 'showSignup': return {...state, signup: true};
        case 'showWinnerModal': return {...state, winner: true, whoWon:action.whoWon};
        case 'hideWinnerModal': return {...state, winner: false}
        case 'showLobbyModal': return {...state, createLobby: true};
        case 'hideLobbyModal': return {...state, createLobby: false}
        case 'showJoinModal': return {...state, joinModal: true};
        case 'hideJoinModal': return {...state, joinModal: false}
        default: return state;
    }
};

export function useModalReducer(initialState:ModalState){
    return useReducer(modalReducer, initialState);
};