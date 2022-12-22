import { Schema, model, Model } from "mongoose";
import bcrypt from "bcrypt";
import { userInt } from "../utils/types";

interface userMethods {
    isCorrectPassword(password:string): boolean;
};

type UserModel = Model<userInt, {}, userMethods>;

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        minLength: 7,
    },
    friends:[
        {
            type: Schema.Types.ObjectId,
            ref: 'ConnectFourUser'
        }
    ]
});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

userSchema.methods.isCorrectPassword = async function(password:string) {
    return await bcrypt.compare(password, this.password);
};

const User = model<userInt, UserModel>('ConnectFourUser', userSchema);

export default User;