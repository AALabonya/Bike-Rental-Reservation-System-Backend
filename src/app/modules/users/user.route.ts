import express from 'express';
import { userControllers } from './user.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const route = express.Router();

route.get('/me', auth(USER_ROLE.admin, USER_ROLE.user), userControllers.getUserProfile)
route.put('/me', auth(USER_ROLE.admin, USER_ROLE.user), userControllers.updateUserProfile)


export const UserRouter = route;