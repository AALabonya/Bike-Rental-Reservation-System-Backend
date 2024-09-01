import { Router } from 'express';
import { UserRouter } from '../modules/users/user.route';

import { BikeRoutes } from '../modules/bike/bike.route';

import { AuthRouter } from '../modules/auth/auth.route';
import { PaymentRoute } from '../modules/payment/payment.route';

import { RentalRoute } from '../modules/booking/rentals.route';
import { CouponRoute } from '../modules/coupon/coupon.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRouter,
  },
  {
    path: '/auth',
    route: AuthRouter,
  },
  {
    path: '/bikes',
    route: BikeRoutes,
  },
  {
    path: '/rentals',
    route: RentalRoute,
  },
  { path: '/payment', route: PaymentRoute },
  { path: '/coupons', route: CouponRoute },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
