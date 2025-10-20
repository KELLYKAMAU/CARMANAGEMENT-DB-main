import { getPool } from "../db/config"
import { createCustomerDTO, updateCustomerDTO } from "../types/customer.types";


export const getAllCustomers = async () => {
    const pool = await getPool();
    const result = await pool.request().query("SELECT * FROM Customers");
    return result.recordset;
}


export const getCustomerById = async (id: number) => {
    const pool = await getPool();
    const result = await pool.request()
        .input('id', id)
        .query('SELECT * FROM dbo.Customers WHERE id = @id');
    return result.recordset[0];
}

export const createCustomer= async(customerData:createCustomerDTO)=>{
    const pool = await getPool();
    const result = await pool.request()
        .input('first_name', customerData.first_name)
        .input('last_name', customerData.last_name)
        .input('email', customerData.email)
         .input('phone_number', customerData.phone_number)
        .input('address', customerData.address)
        .query('INSERT INTO dbo.Customers (first_name, last_name, email, address) VALUES (@first_name, @last_name, @email, @address)')
    return result.recordset;
}

export const deleteCustomer = async (id: number) => {
    const pool = await getPool();
    
    await pool.request()
        .input('id', id)
        .query('DELETE FROM dbo.Customers WHERE id = @id');
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
        // .input('phone_number', updatedCustomer.phone_number)
        .input('address', updatedCustomer.address)
        .query('UPDATE dbo.Customers SET firstName = @firstName, lastName = @lastName, email = @email, address = @address WHERE id = @id');
    return updatedCustomer;
}