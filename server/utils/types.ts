import mongoose, {Model} from "mongoose";

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
export interface userMethods {
    isCorrectPassword(password:string): boolean;
};

export type UserModel = Model<userInt, {}, userMethods>;

export interface MessageVirtuals {
    formattedTime: string;
}

export interface MessageSchema {
    _id: mongoose.Types.ObjectId;
    name: string;
    message: string;
    sentAt: string;
}

export type MessageModel = Model<MessageSchema, {}, MessageVirtuals>

export interface LobbyVirtuals {
    lobbyIsFull: boolean;
}

export interface LobbySchema {
    _id: mongoose.Types.ObjectId;
    name: String;
    gameboard: string[][];
    members: mongoose.Types.ObjectId[];
    lobbyIsFull: boolean;
    messages: mongoose.Types.ObjectId[];
    isGameFinished: boolean;
}

export type LobbyModel = Model<LobbySchema, {}, LobbyVirtuals>