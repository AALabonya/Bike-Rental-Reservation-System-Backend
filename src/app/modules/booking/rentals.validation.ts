import { z } from "zod";

const createRentalValidation = z.object({
  body: z.object({
    startTime: z.string({ required_error: "Start time is required" }),
    bikeId: z.string({ required_error: "Bike Id is Required" }),
  }),
});

const updateRentalValidation = z.object({
  body: z.object({
    startTime: z.string().optional(),
    bikeId: z.string().optional(),
  }),
});

export const RentalValidation = {
  createRentalValidation,
  updateRentalValidation,
};