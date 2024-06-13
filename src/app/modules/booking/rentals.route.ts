import express from 'express'

import validateRequest from '../../middlewares/validateRequest'
import { USER_ROLE } from '../users/user.constant'
import { auth } from '../../middlewares/auth'
import { rentalController } from './rentals.controller'
import { createBikeRentalValidationSchema } from './rentals.validation'



const router = express.Router()

// ! Create Rental Route

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(createBikeRentalValidationSchema),
  rentalController.createBikeRental,
);
router.get('/', rentalController.getAllRentals);

router.put('/:id/return',auth(USER_ROLE.admin), rentalController.returnBike);

export const RentalRoutes = router