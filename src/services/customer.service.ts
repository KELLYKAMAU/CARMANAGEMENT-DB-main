

import * as customerRepositories from '../repositories/customer.repository'
// Update the import to match the actual exported member names from customer.types
import type { NewCustomer, UpdateCustomer } from '../types/customer.types';

// If you want to list all customers, you need to implement a getAllCustomers function in the repository.
// For now, you can remove or comment out this function until such a function exists.
// export const listcustomers = async () => await customerRepositories.getCustomer();
export const getcustomer = async (id: number) => {
    // bad request
    if (isNaN(id)) {
        throw new Error('Invalid customerid')
    }
    const existingcustomer = await customerRepositories.getCustomer(id)
    if (!existingcustomer) {
        throw new Error('customer not found')
    }
    return existingcustomer;
}


export const createcustomer = async (customer: any) => await customerRepositories.createCustomer(customer);
// export const deletecustomer = async (id: number) => await customerRepositories.deletecustomer(id);
export const deletecustomer = async (id: number) => {
    // bad request
    if (isNaN(id)) {
        throw new Error('invalid customerid')
    }
    const existingcustomer = await customerRepositories.getCustomer(id)
    if (!existingcustomer) {
        throw new Error('customer not found')
    }
    return await customerRepositories.deleteCustomer(id)
}

//export const updatecustomer = async (id: number, customer: any) => await customerRepositories.updatecustomer(id, customer);
export const updatecustomer = async (id: number, customer: any) => {
    // bad request
    if (isNaN(id)) {
        throw new Error('invalid customerid')
    }
    const existingcustomer = await customerRepositories.getCustomer(id)
    if (!existingcustomer) {
        throw new Error('customer not found')
    }
    return await customerRepositories.updateCustomer(id, customer)

}

export function listcustomers() {
    throw new Error('Function not implemented.');
}
