import { z } from 'zod'

export const authFormSchema = (type: string) =>
  z.object({
    // sign up
    firstName:
      type === 'sign-in'
        ? z.string().optional()
        : z
            .string({
              required_error: 'First name is required',
            })
            .min(3, {
              message: 'Name must be at least 3 characters long',
            })
            .max(20, {
              message: 'Name must be at most 20 characters long',
            }),
    lastName:
      type === 'sign-in'
        ? z.string().optional()
        : z
            .string({
              required_error: 'Last name is required',
            })
            .min(3, {
              message: 'Last name must be at least 3 characters long',
            }),
    addressLocation:
      type === 'sign-in'
        ? z.string().optional()
        : z
            .string({
              required_error: 'Address is required',
            })
            .max(50),
    city:
      type === 'sign-in'
        ? z.string().optional()
        : z
            .string({
              required_error: 'City is required',
            })
            .max(50),
    state:
      type === 'sign-in'
        ? z.string().optional()
        : z
            .string({
              required_error: 'State is required',
            })
            .min(2)
            .max(2),
    postalCode:
      type === 'sign-in'
        ? z.string().optional()
        : z
            .string({
              required_error: 'Postal code is required',
            })
            .min(3),
    dateOfBirth:
      type === 'sign-in'
        ? z.string().optional()
        : z
            .string({
              required_error: 'Date of birth is required',
            })
            .refine((val) => !isNaN(Date.parse(val)), {
              message: 'Please enter a valid date',
            }),
    ssn:
      type === 'sign-in'
        ? z.string().optional()
        : z
            .string({
              required_error: 'SSN is required',
            })
            .min(3),
    // both
    email: z
      .string({
        required_error: 'Email is required',
        message: 'Please enter a valid email address',
      })
      .email(),
    password: z
      .string({
        required_error: 'Password is required',
        message: 'Password must be at least 8 characters long',
      })
      .min(8),
  })
