

import express from "express";

import validateRequest from "../../middlewares/validateRequest";
import { RentalValidation } from "./rentals.validation";

import { rentalControllers } from "./rentals.controller";


const router = express.Router()

router.post(
  "/",
  
  validateRequest(RentalValidation.createRentalValidation),
  rentalControllers.createRental
);

router.get("/",  rentalControllers.getAllRentals);



export const RentalRoutes = router;