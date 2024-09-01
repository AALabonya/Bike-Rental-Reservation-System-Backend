import { Schema, model } from 'mongoose';
import { ICoupon } from './coupon.interface';

const couponSchema = new Schema<ICoupon>(
  {
    title: { type: String, required: true, unique: true, trim: true },

    coupon: { type: String, required: true, unique: true, trim: true },
    discount: { type: Number, required: true },
  },
  {
    timestamps: true,
  },
);

export const Coupon = model<ICoupon>('Coupon', couponSchema);
