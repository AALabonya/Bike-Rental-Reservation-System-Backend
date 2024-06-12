import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt';

const userSchema=new Schema<TUser>(
    {
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    address:{
     type:String,
     required:true,
    },
    role:{
    type:String,
    enum:['admin','user'],
    default:'user'
    },

},
{
    timestamps:true,
})
    userSchema.pre('save', async function (next) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        user.password = await bcrypt.hash(
          user.password,
          Number(config.bcrypt_salt_rounds),
        );
      
        next();
      });
    
export const User = model<TUser>('User', userSchema)