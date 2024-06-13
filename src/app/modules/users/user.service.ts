import { TUser } from './user.interface';
import { User } from './user.model';

const getUsersIntoDB = async (email: string): Promise<TUser | null> => {
    const user = await User.findOne({ email });
    // console.log(user);
    
    return user;
};

const updateUserProfile = async (
 email: Record<string, unknown>,
  payload: Partial<TUser>,
) => {
    const result = await User.findOneAndUpdate({ email }, payload, { new: true })
    return result
};

export const userServices = {
    getUsersIntoDB,
    updateUserProfile
};