import {Dispatch, SetStateAction, ChangeEvent, FormEvent} from 'react';
//------COMPONENTS-------
//Board

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
export interface GameLobbyError {
    status:boolean;
    message:string;
}
//LoginModal

//MorganBio

//MultiBoard
export interface MultiBoardProps {
    playerType: string;
};
//SignupModal
export interface SignUpError {
    status:boolean;
    message:string;
}

//ToacinBio

//WinnerModal

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

export interface ModalState {
    login: boolean;
    signup: boolean;
    winner: boolean;
    whoWon:string;
    createLobby: boolean;
    joinModal: boolean;
}

export type ModalAction = {type: 'showSignup'} | {type: 'hideSignup'} | {type: 'showLogin'} | {type: 'hideLogin'} | {type: 'showWinnerModal', whoWon:string} | {type: 'hideWinnerModal', whoWon:''} | {type: 'showLobbyModal'} | {type: 'hideLobbyModal'} | {type: 'showJoinModal'} | {type: 'hideJoinModal'}