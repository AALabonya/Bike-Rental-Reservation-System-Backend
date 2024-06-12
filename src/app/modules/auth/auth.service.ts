import bcrypt from 'bcrypt';
import { TUserLogin } from './auth.interface';
import { User } from '../users/user.model';
import { TUser } from '../users/user.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { createToken } from './auth.utils';
import config from '../../config';


const signUpUser = async (payload: TUser) => {
  const result = await User.create(payload);

  return result;
};

const loginUser =  async (payload: Partial<TUser>) => {
    const { email, password } = payload

    const authUser = await User.isUserExistsByEmailID(email as string)

    if (!authUser) {
        throw new AppError(httpStatus.NOT_FOUND, 'User not found')
    }

    const isUserPasswordMatched = await bcrypt.compare(
        password as string,
        authUser.password,
    )

    if (!isUserPasswordMatched) {
        throw new AppError(httpStatus.NOT_FOUND, 'Password is Incorrect')
    }

    const jwtPayload = {
        email: authUser.email,
        role: authUser.role,
    }

    const token = await createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
    )

    const user = await User.findOne({ email: authUser.email })

    return { token, user }
}

export const authServices = { signUpUser, loginUser };