import { z } from 'zod';

const bikeValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    description: z.string({ required_error: 'Description is required' }),
    pricePerHour: z.number({ required_error: 'Price is required' }),
    cc: z.number({ required_error: 'Bike CC is required' }),
    year: z.number({ required_error: 'Year is required' }),
    model: z.string({ required_error: 'Model is required' }),
    brand: z.string({ required_error: 'Brand is required' }),
    engineType: z.string({ required_error: 'Engine type is required' }),
    maximumSpeed: z.string({ required_error: 'Maximum speed is required' }),

    image: z.string({ required_error: 'Image URL is required' }),
  }),
});

export const updateBikeSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    pricePerHour: z.number().optional(),
    cc: z.number().positive().optional(),
    year: z.number().optional(),
    model: z.string().optional(),
    brand: z.string().optional(),
    engineType: z.string().optional(),
    maximumSpeed: z.string().optional(),
    image: z.string().optional(),
  }),
});

export const BikeValidation = {
  bikeValidationSchema,
  updateBikeSchema,
};
