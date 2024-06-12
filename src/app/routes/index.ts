import { Router } from 'express';
import { userRouter } from '../modules/users/user.route';

import { BikeRoutes } from '../modules/bike/bike.route';
import { RentalRoutes } from '../modules/booking/rentals.route';
import { AuthRouter } from '../modules/auth/auth.route';


const router = Router();

const moduleRoutes = [
 {
    path:'/user',
    route:userRouter
 },
 {
   path:'/auth',
   route:AuthRouter
 },
 {
   path: '/bikes',
   route: BikeRoutes,
},
{
path:'/rentals',
route:RentalRoutes
}
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
