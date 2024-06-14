import { Request, Response } from 'express'
import catchAsync from '../../../utils/catchAsync'
import { rentalServices } from './rentals.service'
import sendResponse from '../../../utils/sendResponse'
import httpStatus from 'http-status'


// *create bike data
const createBikeRental = catchAsync(async (req: Request, res: Response) => {
  const userData = req.user
  const payload = req.body
  const result = await rentalServices.createBikeRentalIntoDB(
    userData,
    payload,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rental created successfully',
    data: result,
  })
})
const getAllRentals = catchAsync(async (req, res) => {
  const data = await rentalServices.getAllRentals();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Retrieve rentals successfully!',
    data,
  });
});

const returnBike = catchAsync(async (req, res) => {
  const { id } = req.params;

  const data = await rentalServices.returnBike(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bike returned successfully!',
    data:data,
  });
});
export const rentalController = {
  createBikeRental,
  getAllRentals,
  returnBike
}