import { TUser } from './user.interface';
import { User } from './user.model';

const createUsersIntoDB = async (email: string) => {
    const user = await User.findOne({ email })
    return user
}

const updateUserProfile = async (
 email: Record<string, unknown>,
  payload: Partial<TUser>,
) => {
    const result = await User.findOneAndUpdate({ email }, payload, { new: true })
    return result
};

export const userServices = {
    createUsersIntoDB,
    updateUserProfile
};