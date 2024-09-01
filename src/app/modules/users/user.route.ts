import express from 'express';
import { userControllers } from './user.controller';
import { auth } from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const route = express.Router();
route.get('/', userControllers.getAllUser);
route.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.user),
  userControllers.getUserProfile,
);
route.put(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.user),
  userControllers.updateUserProfile,
);
// update user to admin
route.patch('/:id', auth(USER_ROLE.admin), userControllers.updateUserToAdmin);

// delete user from database
route.delete('/:id', auth(USER_ROLE.admin), userControllers.deleteUser);
export const UserRouter = route;
