import mongoose, { Schema, model } from 'mongoose'
import { TRentals } from './rentals.interface'


const RentalSchema = new Schema<TRentals>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  bikeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'Bike id is required'],
    ref: 'Bike',
  },
  startTime: {
    type: Date,
    required: true,
  },
  returnTime: {
    type: Date,
    default: null,
  },
  totalCost: {
    type: Number,
    default: 0,
  },
  isReturned: {
    type: Boolean,
    default: false,
  },
})

export const Rental = model<TRentals>('Rental', RentalSchema)