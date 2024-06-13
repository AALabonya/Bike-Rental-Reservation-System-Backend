import { z } from 'zod'

export const createBikeRentalValidationSchema = z.object({
  body: z.object({
    bikeId: z.string({
      invalid_type_error: 'Bike Id must be String',
      required_error: 'Bike Id is required',
    }),
    startTime: z.string({
      invalid_type_error: 'Start Time must be String',
      required_error: 'Start Time is required',
    }),
  }),
})