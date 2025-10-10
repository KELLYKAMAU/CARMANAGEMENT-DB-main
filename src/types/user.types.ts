// src/modules/customers/customer.types.ts

/**
 * Represents a full customer record as stored in the database.
 * Mirrors the dbo.Customers table columns.
 */
export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string | null;
  address?: string | null;
  createdAt?: Date;
  updatedAt?: Date | null;
}

/**
 * Represents the input payload when creating a new customer.
 * Corresponds to the createCustomerSchema.
 */
export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string | null;
  address?: string | null;
}

/**
 * Represents the input payload when updating a customer.
 * All fields are optional (partial update).
 */
export type UpdateUser = Partial<User>;

/**
 * Represents the structure of paginated customer list responses.
 * Useful if you add pagination or filtering.
 */
export interface CustomerListResponse {
  total: number;
  customers: Customer[];
}
import { z } from 'zod';

