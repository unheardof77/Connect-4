import { Schema, model } from "mongoose";
import { MessageSchema, MessageModel } from "../utils/types";


const messageSchema = new Schema(
    {
        name:{
            type:String,
            required: true
        }, 
        message:{
            type:String,
            required:true,
            trim: true
        },
        sentAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

messageSchema.virtual("formattedTime").get(function () {
    return this.sentAt.toLocaleTimeString();
})

const Message = model<MessageSchema, MessageModel>('ConnectFourMessage', messageSchema);

export default Message;