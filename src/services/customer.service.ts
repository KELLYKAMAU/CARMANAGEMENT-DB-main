import e from 'express';
import * as customerRepositories from '../repositories/customer.repository';
import { createCustomerDTO } from '../types/customer.types';

export const listAllCustomers = async () => {
    return await customerRepositories.getAllCustomers();
}

export const getCustomerDetails = async (id: number) => {
    if (isNaN(id) || id <= 0) {
        throw new Error("Invalid ID");
    }

    const customer = await customerRepositories.getCustomerById(id);
    if (!customer) {
        throw new Error("Customer not found");
    }

    return customer;
}

export const addNewCustomer = async (customerData: createCustomerDTO) => {
    return await customerRepositories.createCustomer(customerData);
}

export const removeCustomer = async (id: number) => {
    if (isNaN(id) || id <= 0) {
        throw new Error("Invalid ID");
    }
    const customer = await customerRepositories.getCustomerById(id);
    if (!customer) {
        throw new Error("Customer not found");
    }
    return await customerRepositories.deleteCustomer(id);
}
export const modifyCustomer = async (id: number, customerData: Partial<createCustomerDTO>) => {
    if (isNaN(id) || id <= 0) {
        throw new Error("Invalid ID");
    }
    return await customerRepositories.updateCustomer(id, customerData);
}