import mongoose, { Schema, model, Model } from "mongoose";

interface LobbyVirtuals {
    lobbyIsFull: boolean;
}

interface LobbySchema {
    _id: mongoose.Types.ObjectId;
    name: String;
    gameboard: string[][];
    members: mongoose.Types.ObjectId[];
    lobbyIsFull: boolean;
}

type LobbyModel = Model<LobbySchema, {}, LobbyVirtuals>

const gameLobbySchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        gameboard: {
            type: Array,
            default: [[], [], [], [], [], [], []]
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

gameLobbySchema.virtual("lobbyIsFull").get(function () {
    return this.members.length >= 2;
})

const GameLobby = model<LobbySchema, LobbyModel>('GameLobby', gameLobbySchema);

export default GameLobby;

