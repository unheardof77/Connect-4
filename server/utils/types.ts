import mongoose from "mongoose";

export interface userInt {
    username:string;
    password:string;
    friends:mongoose.ObjectId[];
    _id:mongoose.Types.ObjectId;
};

export interface Context {
    user: userInt;
};

export interface LoginSignup {
    username:string;
    password:string;
};

export interface signTokenProp {
    username: string;
    friends: mongoose.Schema.Types.ObjectId[];
    _id: mongoose.Types.ObjectId;
};
export interface CheckoutArgs {
    donationAmount: number;
}
export interface GameNameArgs {
    name: string;
}
export interface CreateMessageArgs {
    name: string;
    message: string;
    GameLobby_id: mongoose.Types.ObjectId;
}
export interface DeleteGameLobbyArgs {
    GameLobby_id: mongoose.Types.ObjectId;
}
export interface UpdateGameLobbyArgs {
    gameboard?: string[][];
    lobbyName: string;
    isGameFinished: boolean;
}