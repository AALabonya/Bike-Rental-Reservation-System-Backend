import catchAsync from "../../../utils/catchAsync";
import { rentalServices } from "./rentals.service";


const createRental = catchAsync(async (req, res) => {
  const { bikeId, startTime } = req.body;

  const userId = req.user._id;

  const rental = await rentalServices.createRental(userId, bikeId, startTime);

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Rental created successfully",
    data: rental,
  });
});

const getAllRentals = catchAsync(async (req, res) => {
  const rental = await rentalServices.getAllRentals();

  if (rental.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Data Found",
      data: [],
    });
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Rentals retrieved successfully",
    data: rental,
  });
});

export const rentalControllers = {
  createRental,
  getAllRentals,
};