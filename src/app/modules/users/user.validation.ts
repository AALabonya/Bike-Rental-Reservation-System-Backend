import { z } from "zod"

const createUserSignupValidationSchema = z.object({
	body: z.object({
		name: z.string({ required_error: "Name is required" }),
        email: z.string().email({ message: "Invalid email address" }),
		password: z.string({ required_error: "Password is required" }),
		phone: z.string({ required_error: "Phone number is required" }),
		address: z.string({ required_error: "Address is required" }),
		role: z.enum(['admin', 'user'])
	}),
})


// Validation schema for user login
const userloginValidationSchema = z.object({
    body: z.object({
        email: z.string().email({ message: 'Email must be valid' }),
        password: z
            .string({ invalid_type_error: 'Password must be string' })
    }),
})


// Validation schema for updating user profile
 const updateUserSchema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    role: z.enum(['admin', 'user']).optional()
  });

export const UserValidationSchema = {
	createUserSignupValidationSchema,
    userloginValidationSchema,
    updateUserSchema
}





