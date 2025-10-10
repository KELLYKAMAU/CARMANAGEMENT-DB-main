
import { Request, Response } from 'express';
import * as customerServices from '../services/customer.service'
import { getPool } from '../db/config'

//bad practice controller doing everything
export const getAllcustomersController = async (req: Request, res: Response) => {
    try {
        const pool = await getPool();
        const result = await pool.request().query('SELECT * FROM customers');
        res.status(200).json(result.recordset);

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });

    }
}

//bad practice controller doing everything
export const AddcustomerController = async (req: Request, res: Response) => {
    const { customer_name, description, due_date, user_id } = req.body;
    try {
        const pool = await getPool();
        await pool
            .request()
            .input('customer_name', customer_name)
            .input('description', description)
            .input('due_date', due_date)
            .input('user_id', user_id)
            .query('INSERT INTO customers (customer_name, description, due_date, user_id) VALUES (@customer_name, @description, @due_date, @user_id)');
        res.status(201).json({ message: 'customer created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

//get all customers
export const getcustomers = async (req: Request, res: Response) => {
    try {
        const customers = await customerServices.listcustomers();
        res.status(200).json(customers);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

//get customer by id
export const getcustomerById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    try {
        const customer = await customerServices.getcustomer(id)
        res.status(200).json(customer)

    } catch (error: any) {
        if (error.message === 'Inavlid customerid') {
            res.status(400).json({ message: 'Inavlid customerid' })
        } else if (error.message == 'customer not found') {
            res.status(404).json({ message: 'customer not found' })
        } else {
            res.status(500).json({ error: 'Internal server error' })
        }
    }
}


//create new customer
export const createcustomer = async (req: Request, res: Response) => {
    const customer = req.body;
    try {
        const result = await customerServices.createcustomer(customer);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

//update a customer
export const updatecustomer = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const customer = req.body
    try {
        const result = await customerServices.updatecustomer(id, customer)
        res.status(200).json(result)
    } catch (error: any) {
        if (error.message === 'Inavlid customerid') {
            res.status(400).json({ message: 'Inavlid customerid' })
        } else if (error.message == 'customer not found') {
            res.status(404).json({ message: 'customer not found' })
        } else {
            res.status(500).json({ error: 'Internal server error' })
        }

    }

}


// delete a customer by id
export const deletecustomer = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
        const result = await customerServices.deletecustomer(id)
        res.status(204).json(result)
    } catch (error: any) {
        if (error.message === 'Inavlid customerid') {
            res.status(400).json({ message: 'Inavlid customerid' })
        } else if (error.message == 'customer not found') {
            res.status(404).json({ message: 'customer not found' })
        } else {

            res.status(500).json({ error: 'Internal server error' })
        }

    }
}