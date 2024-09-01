import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import sendResponse, { sendTokenResponse } from '../../../utils/sendResponse';
import { BikeServices } from './bike.service';

const createBike = catchAsync(async (req, res) => {
  const result = await BikeServices.createBikeIntoDB(req.body);
  res.json({
    success: true,
    statusCode: 200,
    message: 'Bike added successfully',
    data: result,
  });
});
const getSingleBikes = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BikeServices.getSingleBikes(id);
  res.json({
    success: true,
    statusCode: 200,
    message: 'Successfully retrieved single bike',
    data: result,
  });
});
const getAllBikes = catchAsync(async (req, res) => {
  const result = await BikeServices.getAllBikesFromDB(req.query);
  sendTokenResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bikes retrieved successfully',
    data: result.data,
    meta: result.meta,
  });
});
const updateBike = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const data = await BikeServices.updateBikes(id, payload);
  console.log(data);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bike updated successfully!',
    data,
  });
});

const deleteBike = catchAsync(async (req, res) => {
  const { id } = req.params;

  const data = await BikeServices.deleteBikes(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bike deleted successfully!',
    data: data,
  });
});

export const BikeController = {
  createBike,
  getAllBikes,
  getSingleBikes,
  updateBike,
  deleteBike,
};
