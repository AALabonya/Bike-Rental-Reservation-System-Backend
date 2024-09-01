import { Router } from 'express';

import { PaymentController } from './payment.controller';
import { USER_ROLE } from '../users/user.constant';
import { auth } from '../../middlewares/auth';

const router = Router();

router.post(
  '/create-payment-intent',
  auth(USER_ROLE.admin, USER_ROLE.user),
  PaymentController.createPaymentIntent,
);

export const PaymentRoute = router;
