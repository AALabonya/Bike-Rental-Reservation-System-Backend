import express from 'express';

import { BikeController } from './bike.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BikeValidation } from './bike.validation';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from '../users/user.constant';
const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(BikeValidation.bikeValidationSchema),
  BikeController.createBike,
);
router.get('/:id', BikeController.getSingleBikes);
router.get('/', BikeController.getAllBikes);
router.patch(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(BikeValidation.updateBikeSchema),
  BikeController.updateBike,
);

router.delete('/:id', auth(USER_ROLE.admin), BikeController.deleteBike);
export const BikeRoutes = router;
