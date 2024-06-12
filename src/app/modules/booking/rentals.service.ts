import { Bike } from "../bike/bike.model";
import { TRentals } from "./rentals.interface";
import { rentals } from "./rentals.model";


const createRental = async (
  userId: string,
  bikeId: string,
  startTime: Date
): Promise<TRentals> => {
  try {
    await Bike.findByIdAndUpdate(bikeId, { isAvailable: false });

    const rental = await rentals.create({
      userId,
      bikeId,
      startTime,
      returnTime: null,
    });

    return rental;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const getAllRentals = async () => {
  const result = await rentals.find();

  if (!result) {
    throw new Error("No Data Found");
  }

  return result;
};

export const rentalServices = {
  createRental,
  getAllRentals,
};