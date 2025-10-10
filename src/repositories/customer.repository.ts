import { getPool } from '../db/config'
import { Newcustomer, customer, Updatecustomer } from '../types/customer.types';

//get all customers
export const getAllcustomers = async (): Promise<customer[]> => {
    const pool = await getPool();
    const result = await pool.request().query('SELECT * FROM customers');
    return result.recordset;
}

//get customer by id
export const getcustomerById = async (id: number): Promise<customer> => {
    const pool = await getPool();
    const result = await pool
        .request()
        .input('id', id)
        .query('SELECT * FROM customers WHERE customerid = @id');
    return result.recordset[0];
}

//create new customer
export const createcustomer = async (customer: Newcustomer) => {
    const pool = await getPool();
    await pool
        .request()
        .input('customer_name', customer.customer_name)
        .input('description', customer.description)
        .input('due_date', customer.due_date)
        .input('user_id', customer.user_id)
        .query('INSERT INTO customers (customer_name, description, due_date, user_id) VALUES (@customer_name, @description, @due_date, @user_id)');
    return { message: 'customer created successfully' };
}

/* JSON Example
{
    "customer_name": "New customer",
    "description": "This is a new customer",
    "due_date": "2023-12-31",
    "user_id": 1
}
*/

// update a customer
export const updatecustomer = async (id: number, customer: Updatecustomer) => {
    const pool = await getPool();
    await pool
        .request()
        .input('id', id)
        .input('customer_name', customer.customer_name)
        .input('description', customer.description)
        .input('due_date', customer.due_date)
        .input('user_id', customer.user_id)
        .query('UPDATE customers SET customer_name = @customer_name, description = @description, due_date = @due_date, user_id = @user_id WHERE customerid = @id');
    return { message: 'customer updated successfully' };
}

//delete a customer
export const deletecustomer = async (id: number) => {
    const pool = await getPool();
    await pool
        .request()
        .input('id', id)
        .query('DELETE FROM customers WHERE customerid = @id');
    return
}