import { Router } from 'express';
import { USER_ROLE } from '../users/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { rentalValidation } from './rentals.validation';
import { auth } from '../../middlewares/auth';
import { RentalController } from './rentals.controller';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(rentalValidation.createRentalValidationSchema),
  RentalController.createRental,
);

router.put(
  '/:id/return',
  auth(USER_ROLE.admin, USER_ROLE.user),
  RentalController.returnRental,
);
router.put(
  '/:id/calculate',
  auth(USER_ROLE.admin),
  RentalController.calculateCost,
);
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  RentalController.getAllRentals,
);
router.get('/all', auth(USER_ROLE.admin), RentalController.getRentals);

export const RentalRoute = router;
