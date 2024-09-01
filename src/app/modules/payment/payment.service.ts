import httpStatus from 'http-status';
import Stripe from 'stripe';
import config from '../../config';
import AppError from '../../errors/AppError';

const createPaymentIntent = async (payload: {
  amount: number;
  currency: string;
}) => {
  const { amount, currency } = payload;
  // console.log(amount, currency);

  const stripe = new Stripe(config.stripe_secret_key as string, {
    apiVersion: '2024-06-20',
  });

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: currency,
    });

    // console.log('payment', paymentIntent.amount);

    return paymentIntent.client_secret;
  } catch (error) {
    console.log(error);

    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Faild to create payment intent',
    );
  }
};

export const PaymentService = {
  createPaymentIntent,
};
