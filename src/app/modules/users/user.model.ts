import { Schema, model } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt';

const userSchema=new Schema<TUser, UserModel>(
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
    password: { type: String, required: true, select: 0 },
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
        user.password = await bcrypt.hash(user.password,Number(config.bcrypt_salt_rounds));
      
        next();
      });
  
  
      userSchema.static('isUserExistsByEmailID', async function (email: string) {
        return await User.findOne({ email }).select('+password')
    })
export const User = model<TUser,UserModel>('User', userSchema)