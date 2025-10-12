import { getPool } from "../db/config"
import { createCustomerDTO, updateCustomerDTO } from "../types/customer.types";


export const getAllCustomers = async () => {
    const pool = await getPool();
    const result = await pool.request().query("SELECT * FROM Customer");
    return result.recordset;
}


export const getCustomerById = async (id: number) => {
    const pool = await getPool();
    const result = await pool.request()
        .input('id', id)
        .query('SELECT * FROM Customer WHERE customer_id = @id');
    return result.recordset[0];
}

export const createCustomer= async(customerData:createCustomerDTO)=>{
    const pool = await getPool();
    const result = await pool.request()
        .input('firstName', customerData.firstName)
        .input('lastName', customerData.lastName)
        .input('email', customerData.email)
        .input('phone_number', customerData.phone_number)
        .input('address', customerData.address)
        .query('INSERT INTO Customer (firstName, lastName, email, phone_number, address) VALUES (@firstName, @lastName, @email, @phone_number, @address)')
    return result.recordset;
}

export const deleteCustomer = async (id: number) => {
    const pool = await getPool();
    await pool.request()
        .input('id', id)
        .query('DELETE FROM Customer WHERE customer_id = @id');
    return { message: "Customer deleted successfully" };
}

export  const updateCustomer = async (id: number, customerData: Partial<updateCustomerDTO>) => {
    const pool = await getPool();
    const existingCustomer = await getCustomerById(id);
    if (!existingCustomer) {
        throw new Error("Customer not found");
    }
    const updatedCustomer = { ...existingCustomer, ...customerData };
    await pool.request()
        .input('id', id)
        .input('firstName', updatedCustomer.firstName)
        .input('lastName', updatedCustomer.lastName)
        .input('email', updatedCustomer.email)
        .input('phone_number', updatedCustomer.phone_number)
        .input('address', updatedCustomer.address)
        .query('UPDATE Customer SET firstName = @firstName, lastName = @lastName, email = @email, phone_number = @phone_number, address = @address WHERE customer_id = @id');
    return updatedCustomer;
}