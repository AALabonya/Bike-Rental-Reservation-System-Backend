import { JwtPayload } from 'jsonwebtoken'

import httpStatus from 'http-status'
import AppError from '../../errors/AppError'

import mongoose, { startSession } from 'mongoose'
import { TRentals } from './rentals.interface'
import { Bike } from '../bike/bike.model'
import { Rental } from './rentals.model'
import { User } from '../users/user.model'


const createBikeRentalIntoDB = async (
  userData: JwtPayload,
  payload: TRentals,
) => {
  const {bikeId, startTime}=payload

  //check if user is exist
const isUserExist=await User.findOne({email: userData.email})
// console.log(isUserExist);

 if(!isUserExist){
  throw new AppError(httpStatus.NOT_FOUND,'User not found')
 }

 //check if bike is exist
 const isBikeExist= await Bike.findById(bikeId)
 if(!isBikeExist){
  throw new AppError(httpStatus.NOT_FOUND,'User not found')
 }
 
 const rentalInfo={
  userId: isUserExist._id,
  bikeId,
  startTime
 }

 const session= await startSession()

 try {
  session.startTransaction()
  const createRentalData= await Rental.create([rentalInfo],{session})
 if(!createRentalData.length){
  throw new AppError(httpStatus.BAD_REQUEST,'Failed to create Rental')
 }
 await Bike.findByIdAndUpdate(
  bikeId,{
    isAvailable:false,
  },{session}
 )
 await session.commitTransaction();
        return createRentalData[0];
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        await session.endSession();
    }

}

const returnBike = async (id: string) => {
  // find current rentals
  const currentRentals = await Rental.findById(id);
  const bikeId = currentRentals?.bikeId;
// console.log(bikeId);

  if (!currentRentals) {
    throw new AppError(httpStatus.NOT_FOUND, 'Rental is no found!');
  }


  const rentalsBike = await Bike.findById(bikeId);

  if (!rentalsBike) {
    throw new AppError(httpStatus.NOT_FOUND, 'Bike is no found!');
  }

  const pricePerHour = rentalsBike?.pricePerHour;
  // console.log(pricePerHour);
  
  const startTime = new Date(currentRentals?.startTime as Date);
// console.log(startTime);


  const returnTime = new Date();
  // console.log(returnTime);
  

  const differenceTime = returnTime.getTime() - startTime.getTime();
  // console.log(differenceTime);
  
  const differenceInHours = (differenceTime / (1000 * 60 * 60)).toFixed(2);
// console.log(differenceInHours);

  const totalCost = (Number(differenceInHours) * Number(pricePerHour)).toFixed(
    2,
  );
  const session = await startSession();

  try {
    // starting transaction session
    session.startTransaction();
    const isAvailableUpdate = await Bike.findByIdAndUpdate(
      currentRentals?.bikeId,
      { isAvailable: true },
      { new: true, runValidators: true, session },
    );

    if (!isAvailableUpdate) {
      throw new AppError(httpStatus.BAD_REQUEST,
        'Bike availability update failed!',
      );
    }
    const updateRental = await Rental.findByIdAndUpdate(
      id,
      { returnTime, totalCost, isReturned: true },
      { new: true, runValidators: true, session },
    );

    if (!updateRental) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Rental update failed!');
    }

  
    await session.commitTransaction();
    session.endSession();

    return updateRental;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Return rental failed!');
  }
};

const getAllRentals = async () => {
  const data = await Rental.find();
  return data;
};

export const rentalServices = {
  createBikeRentalIntoDB,
  returnBike,
  getAllRentals
}