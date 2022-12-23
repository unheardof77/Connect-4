import {Dispatch, SetStateAction, ChangeEvent, FormEvent} from 'react';
//------COMPONENTS-------
//Board
export interface BoardProps {
    setWinner: Dispatch<SetStateAction<string>>;
    winner: string;
};
//ChatBox
interface Message {
    name: string;
    message: string;
    formattedTime: string;
};

export interface ChatBoxProp {
    sentMessage: string;
    handleMessageChange: (e:ChangeEvent<HTMLInputElement>)=>void;
    chatMessages: Message[];
    handleMessageSubmit: (e:FormEvent)=>void;
    piece: string;
    username:string | undefined;
    data: {
        gameLobbyChanged:{
            lobbyIsFull: boolean;
        }
    }
};

export interface MessageColorObj {
    color:string;
};
//CreateLobbyModal

//EndeavorSlides
export interface SlideInfo {
    label: string;
    description: string;
    image?: any;
    alt:string;
};
//Header

//JoinGameModal

//LoginModal

//MorganBio

//MultiBoard
export interface MultiBoardProps {
    winner: string;
    setWinner: Dispatch<SetStateAction<string>>;
    playerType: string;
};
//SignupModal

//ToacinBio

//WinnerModal
export interface WinnerState {
    winner: string
};
//------PAGES--------

//AboutPage

//BoardPage

//DonationProcessed

//HomePage

//MultiplayerBoardPage


//------UTILS-------

//auth
interface ProfileData {
    friends: [];
    username: string;
    _id: string;
}
export interface DecodeOBJ {
    exp: number
}

export interface Profile {
    data: ProfileData;
    exp: number;
    iat: number;
}
//crud

//statemanagment
export type Action = | {type: 'Finished Game', payload: string[][]} | {type: 'updateBoard', payload: string[][]};

export interface ModalState {
    login: boolean;
    signup: boolean;
    winner: boolean;
    createLobby: boolean;
    joinModal: boolean;
}

export type ModalAction = {type: 'showSignup'} | {type: 'hideSignup'} | {type: 'showLogin'} | {type: 'hideLogin'} | {type: 'showWinnerModal'} | {type: 'hideWinnerModal'} | {type: 'showLobbyModal'} | {type: 'hideLobbyModal'} | {type: 'showJoinModal'} | {type: 'hideJoinModal'}