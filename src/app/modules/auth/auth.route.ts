import express from 'express';
import { authController } from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidationSchema } from '../users/user.validation';

const route = express.Router();

route.post(
  '/signup',
  validateRequest(UserValidationSchema.createUserSignupValidationSchema),
  authController.signUpUser,
);
route.post(
  '/login',
  validateRequest(UserValidationSchema.userloginValidationSchema),
  authController.loginUser,
);

export const AuthRouter = route;