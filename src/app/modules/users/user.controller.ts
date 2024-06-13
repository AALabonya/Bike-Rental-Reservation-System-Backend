import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import { userServices } from './user.service';
import sendResponse from '../../../utils/sendResponse';
import httpStatus from 'http-status';


const getUserProfile = catchAsync(async (req, res) => {
    const { email } = req.user
    // console.log( req.body);
    
    const result = await userServices.getUsersIntoDB(email)
// console.log(result);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User profile retrieved successfully',
        data: result,
    })
})
const updateUserProfile= catchAsync(async (req, res) => {
    const { email } = req.user
    const payload = req.body
    const result = await userServices.updateUserProfile(email, payload)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Profile updated successfully',
        data: result,
    })
})


export const userControllers = {
   getUserProfile,
    updateUserProfile
};