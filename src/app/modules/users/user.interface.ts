import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser{
    name:string;
    email:string;
    password:string;
    phone:string;
    address:string;
    role:'admin'|'user'
}

export interface UserModel extends Model<TUser> {
    isUserExistsByEmailID(email: string): Promise<TUser>;
}

export type TUserRole = keyof typeof USER_ROLE;