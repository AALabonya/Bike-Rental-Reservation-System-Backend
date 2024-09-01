import catchAsync from '../../../utils/catchAsync';
import { userServices } from './user.service';
import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';

const getAllUser = catchAsync(async (req, res) => {
  const result = await userServices.getAllUser();
  //   console.log(result);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Retrieved All User successfully',
    data: result,
  });
});
const getUserProfile = catchAsync(async (req, res) => {
  const { email } = req.user;
  // console.log( req.body);

  const result = await userServices.getUsersIntoDB(email);
  // console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  });
});
const updateUserProfile = catchAsync(async (req, res) => {
  const { email } = req.user;
  const payload = req.body;
  const result = await userServices.updateUserProfile(email, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});
// Update user information
const updateUserToAdmin = catchAsync(async (req, res) => {
  const result = await userServices.updateUserToAdmin(req.params.id, {
    role: 'admin',
  });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Update User to Admin successfully',
    data: result,
  });
});
// Update user information
const deleteUser = catchAsync(async (req, res) => {
  const result = await userServices.deleteUser(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User deleted successfully',
    data: result,
  });
});
export const userControllers = {
  getAllUser,
  getUserProfile,
  updateUserToAdmin,
  deleteUser,
  updateUserProfile,
};
