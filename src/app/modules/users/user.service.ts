import { TUser } from './user.interface';
import { User } from './user.model';
const getAllUser = async () => {
  const result = await User.find();
  //   console.log(result);

  return result;
};
const getUsersIntoDB = async (email: string): Promise<TUser | null> => {
  const user = await User.findOne({ email });
  // console.log(user);

  return user;
};

const updateUserProfile = async (
  email: Record<string, unknown>,
  payload: Partial<TUser>,
) => {
  const result = await User.findOneAndUpdate({ email }, payload, { new: true });
  return result;
};
const updateUserToAdmin = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteUser = async (id: string) => {
  const result = await User.findByIdAndDelete({ _id: id }, { new: true });
  return result;
};
export const userServices = {
  getAllUser,
  getUsersIntoDB,
  updateUserToAdmin,
  deleteUser,
  updateUserProfile,
};
