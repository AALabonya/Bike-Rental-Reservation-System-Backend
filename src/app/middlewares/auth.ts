import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/users/user.interface';
import catchAsync from '../../utils/catchAsync';
import AppError from '../errors/AppError';
import { User } from '../modules/users/user.model';


export const auth = (...requestRoles: TUserRole[]) => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const bearerToken = req.headers.authorization;
            const token = bearerToken?.split(' ')[1];
            if (!token) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    "You have no access to this route",
                );
            }
            const decoded = jwt.verify(
                token,
                config.jwt_access_secret as string,
            );

            const { email, role, iat } = decoded as JwtPayload;

            const auhUser = await User.isUserExistsByEmailID(email);

            if (!auhUser) {
                throw new AppError(
                    httpStatus.NOT_FOUND,
                    'The user is not found',
                );
            }

            if (requestRoles && !requestRoles.includes(role)) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    'You have no access to this route',
                );
            }
            req.user = { email, role };

            next();
        },
    );
};