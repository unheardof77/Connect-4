import { Schema, model } from "mongoose";
import { LobbySchema, LobbyModel } from "../utils/types";

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
                ref: 'ConnectFourUser'
            }
        ],
        messages: [
            {
                type: Schema.Types.ObjectId,
                ref: 'ConnectFourMessage'
            }
        ],
        isGameFinished: {
            type: Boolean,
            default: false
        }
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

const GameLobby = model<LobbySchema, LobbyModel>('ConnectFourGameLobby', gameLobbySchema);

export default GameLobby;

