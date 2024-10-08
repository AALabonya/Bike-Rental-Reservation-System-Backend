import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import { RentalService } from './rentals.service';
import sendResponse from '../../../utils/sendResponse';

const createRental = catchAsync(async (req, res) => {
  const user = req.user;
  const payload = req.body;
  const result = await RentalService.createRental(user, payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rental created successfully',
    data: result,
  });
});

const calculateCost = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await RentalService.calculateCost(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike returned successfully',
    data: result,
  });
});

const returnRental = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await RentalService.returnRental(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike returned successfully',
    data: result,
  });
});

const getAllRentals = catchAsync(async (req, res) => {
  const { email } = req.user;

  const result = await RentalService.getAllRentals(email, req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rentals retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});
const getRentals = catchAsync(async (req, res) => {
  const result = await RentalService.getRentals(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rentals retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});

export const RentalController = {
  calculateCost,
  createRental,
  returnRental,
  getAllRentals,
  getRentals,
};
