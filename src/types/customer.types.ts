
// src/modules/customers/customer.types.ts
import { z } from 'zod';

export const NewCustomer = z.object({
  firstName: z.string().min(1, { message: 'First name is required' }),
  lastName: z.string().min(1, { message: 'Last name is required' }),
  email: z.string().email({ message: 'Invalid email format' }),
  phoneNumber: z
    .string()
    .regex(/^\+?\d{7,15}$/, { message: 'Phone number must be 7–15 digits (optional +)' })
    .optional(),
  address: z.string().optional()
});

export const UpdateCustomer = NewCustomer.partial();