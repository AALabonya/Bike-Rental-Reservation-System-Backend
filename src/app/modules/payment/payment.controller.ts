import httpStatus from 'http-status';

import { PaymentService } from './payment.service';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';

const createPaymentIntent = catchAsync(async (req, res) => {
  const payload = req.body;

  const result = await PaymentService.createPaymentIntent(payload);
  console.log(result);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rental created successfully',
    data: result,
  });
});

export const PaymentController = {
  createPaymentIntent,
};
