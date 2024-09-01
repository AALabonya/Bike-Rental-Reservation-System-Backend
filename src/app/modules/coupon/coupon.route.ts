import { Router } from 'express';

import { CouponController } from './coupon.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../users/user.constant';

const router = Router();

router.get('/', CouponController.allCoupons);

router.post(
  '/:code',
  auth(USER_ROLE.admin, USER_ROLE.user),
  CouponController.singleCoupon,
);

router.put('/:id', auth(USER_ROLE.admin), CouponController.updateCoupon);

router.post('/', auth(USER_ROLE.admin), CouponController.createCoupon);

router.delete('/:id', auth(USER_ROLE.admin), CouponController.deleteCoupon);

export const CouponRoute = router;
