

import * as customerRepositories from '../repositories/customer.repository'
// Update the import to match the actual exported member names from customer.types
import { Newcustomer, Updatecustomer } from '../types/customer.types';

export const listcustomers = async () => await customerRepositories.getAllcustomers();
export const getcustomer = async (id: number) => {
    // bad request
    if (isNaN(id)) {
        throw new Error('Invalid customerid')
    }
    const existingcustomer = await customerRepositories.getcustomerById(id)
    if (!existingcustomer) {
        throw new Error('customer not found')
    }
    return existingcustomer;
}


export const createcustomer = async (customer: Newcustomer) => await customerRepositories.createcustomer(customer);
// export const deletecustomer = async (id: number) => await customerRepositories.deletecustomer(id);
export const deletecustomer = async (id: number) => {
    // bad request
    if (isNaN(id)) {
        throw new Error('invalid customerid')
    }
    const existingcustomer = await customerRepositories.getcustomerById(id)
    if (!existingcustomer) {
        throw new Error('customer not found')
    }
    return await customerRepositories.deletecustomer(id)
}

//export const updatecustomer = async (id: number, customer: any) => await customerRepositories.updatecustomer(id, customer);
export const updatecustomer = async (id: number, customer: Updatecustomer) => {
    // bad request
    if (isNaN(id)) {
        throw new Error('invalid customerid')
    }
    const existingcustomer = await customerRepositories.getcustomerById(id)
    if (!existingcustomer) {
        throw new Error('customer not found')
    }
    return await customerRepositories.updatecustomer(id, customer)

}