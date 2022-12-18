import mongoose, { Schema, model, Model } from "mongoose";

interface MessageVirtuals {
    formattedTime: string;
}

interface MessageSchema {
    _id: mongoose.Types.ObjectId;
    name: string;
    message: string;
    sentAt: string;
}

type MessageModel = Model<MessageSchema, {}, MessageVirtuals>

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

const Message = model<MessageSchema, MessageModel>('Message', messageSchema);

export default Message;