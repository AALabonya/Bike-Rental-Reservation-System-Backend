import httpStatus from "http-status";
import catchAsync from "../../../utils/catchAsync";
import sendResponse, { sendTokenResponse } from "../../../utils/sendResponse";
import { authServices } from "./auth.service";

const signUpUser = catchAsync(async (req, res) => {
    const payload = req.body
    const result = await authServices.signUpUser(payload)
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'User registered successfully',
        data: result,
    })
})
  
  const loginUser = catchAsync(async (req, res) => {
    const payload = req.body
    const { token, user }  = await authServices.loginUser(payload)

   sendTokenResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User logged in successfully',
        token: token,
        data: user,
    })
})
  
  export const authController = { signUpUser, loginUser };