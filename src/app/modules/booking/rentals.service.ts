import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { startSession } from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { IRental } from './rentals.interface';
import { User } from '../users/user.model';
import AppError from '../../errors/AppError';
import { Bike } from '../bike/bike.model';
import { Rental } from './rentals.model';

const createRental = async (user: JwtPayload, payload: IRental) => {
  const { bikeId, startTime } = payload;

  // checking if user exists
  const authUser = await User.findOne({ email: user.email });
  if (!authUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Not Found');
  }

  // checking if bike exists
  const requestedBike = await Bike.findById(bikeId);
  if (!requestedBike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike Not Found');
  }

  const rentalData = {
    userId: authUser._id,
    bikeId,
    startTime,
  };

  // creating session
  const session = await startSession();

  try {
    // starting transaction session
    session.startTransaction();

    const createRental = await Rental.create([rentalData], { session });

    if (!createRental.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Rental');
    }

    await Bike.findByIdAndUpdate(
      bikeId,
      {
        isAvailable: false,
      },
      { session },
    );

    await session.commitTransaction();
    return createRental[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

const returnRental = async (id: string) => {
  const rental = await Rental.findById(id);

  if (!rental) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Rental found');
  }

  const bikeId = rental.bikeId;

  // creating session
  const session = await startSession();

  try {
    // starting transaction session
    session.startTransaction();

    const updateBike = await Bike.findByIdAndUpdate(
      bikeId,
      {
        isAvailable: true,
      },
      { session },
    );

    if (!updateBike) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Update Bike');
    }

    const updateRental = await Rental.findByIdAndUpdate(
      id,
      {
        returnTime: new Date(),
        isReturned: true,
        bookingPayment: 'paid',
      },
      { new: true, session },
    );

    if (!updateRental) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Update Rental');
    }

    await session.commitTransaction();

    return updateRental;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

// const calculateCost = async (id: string) => {
//   const rental = await Rental.findById(id);

//   if (!rental) {
//     throw new AppError(httpStatus.NOT_FOUND, 'No Rental found');
//   }

//   const bikeId = rental.bikeId;
//   const startTime: Date = new Date(rental.startTime);
//   const currentTime: Date = new Date();

//   const totalMilliseconds: number = currentTime.getTime() - startTime.getTime();
//   const totalHours: number = totalMilliseconds / (1000 * 60 * 60);

//   const roundedTotalHours: number = parseInt(totalHours.toFixed(0), 10);

//   // creating session
//   const session = await startSession();

//   try {
//     // starting transaction session
//     session.startTransaction();

//     const updateBike = await Bike.findByIdAndUpdate(
//       bikeId,
//       {
//         isAvailable: true,
//       },
//       { session },
//     );

//     if (!updateBike) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Update Bike');
//     }

//     const updateRental = await Rental.findByIdAndUpdate(
//       id,
//       {
//         totalCost: roundedTotalHours * updateBike?.pricePerHour - 100,
//       },
//       { new: true, session },
//     );

//     if (!updateRental) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Update Rental');
//     }

//     await session.commitTransaction();

//     return updateRental;
//   } catch (error) {
//     await session.abortTransaction();
//     throw error;
//   } finally {
//     await session.endSession();
//   }
// };
const calculateCost = async (id: string) => {
  const rental = await Rental.findById(id);
  const bikeId = rental?.bikeId;
  if (!rental) {
    throw new AppError(httpStatus.NOT_FOUND, 'No Rental found');
  }

  const rentalsBike = await Bike.findById(bikeId);

  if (!rentalsBike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike is no found!');
  }

  // const pricePerHour = rentalsBike?.pricePerHour;
  // console.log(pricePerHour);

  const startTime = new Date(rental?.startTime as Date);
  // console.log(startTime);

  const returnTime = new Date();
  // console.log(returnTime);

  const differenceTime = returnTime.getTime() - startTime.getTime();
  // console.log(differenceTime);

  const differenceInHours = differenceTime / (1000 * 60 * 60);
  // console.log(differenceInHours);

  const totalhours: number = parseInt(differenceInHours.toFixed(0));

  // creating session
  const session = await startSession();

  try {
    // starting transaction session
    session.startTransaction();

    const updateBike = await Bike.findByIdAndUpdate(
      bikeId,
      {
        isAvailable: true,
      },
      { session },
    );

    if (!updateBike) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Update Bike');
    }

    const updateRental = await Rental.findByIdAndUpdate(
      id,
      {
        totalCost: totalhours * updateBike?.pricePerHour,
      },
      { new: true, session },
    );

    if (!updateRental) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Update Rental');
    }

    await session.commitTransaction();

    return updateRental;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

const getAllRentals = async (email: string, query: Record<string, unknown>) => {
  const authUser = await User.findOne({ email });
  if (!authUser) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Not Found');
  }

  const RentalQuery = new QueryBuilder(
    Rental.find({
      userId: authUser._id,
    }).populate('bikeId'),
    query,
  )
    .search(['bookingPayment'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await RentalQuery.countTotal();
  const data = await RentalQuery.modelQuery;

  return {
    meta,
    data,
  };
};

const getRentals = async (query: Record<string, unknown>) => {
  const RentalQuery = new QueryBuilder(
    Rental.find().populate('bikeId').populate('userId'),
    query,
  )
    .search(['bookingPayment'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await RentalQuery.countTotal();
  const data = await RentalQuery.modelQuery;

  return {
    meta,
    data,
  };
};

export const RentalService = {
  calculateCost,
  createRental,
  returnRental,
  getAllRentals,
  getRentals,
};
