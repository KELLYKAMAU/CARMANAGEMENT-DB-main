import * as customerServices from '../services/customer.service';
import { Request, Response } from 'express';



export const getCustomers = async (req: Request, res: Response) => {
    try {
        const customers = await customerServices.listAllCustomers();
       res.status(200).json(customers);
    } catch (error) {
        
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const getCustomer = async (req: Request, res: Response) => {
    const id= parseInt(req.params.id);
    try {
        const customer = await customerServices.getCustomerDetails(id);
        res.status(200).json(customer);
    } catch (error:any) {
        if (error.message === "Invalid ID") {
            return res.status(400).json({ error: error.message });
        }
            if (error.message === "Customer not found") {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

export const createCustomer = async (req: Request, res: Response) => {
    const customerData = req.body;
    try {
        const newCustomer = await customerServices.addNewCustomer(customerData);
        res.status(201).json({ message: "Customer added successfully", customer: newCustomer });
        
    } catch (error: any) {
        res.status(500).json({ error: "Internal Server Error", details: error.message } );
    }
}

export const updateCustomer = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const customerData = req.body;
    try {
        const updatedCustomer = await customerServices.modifyCustomer(id, customerData);
        res.status(200).json({ message: "Customer updated successfully", customer: updatedCustomer });
    } catch (error: any) {
        if (error.message === "Invalid ID") {
            return error;
            // return res.status(400).json({ error: error.message });
        }
        if (error.message === "Customer not found") {
            res.status(404).json({ error: error.message });
        } else {
            // res.status(500).json({ error: "Internal Server Error" });
            return error;
        }
    }
}

export const deleteCustomer = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const result = await customerServices.removeCustomer(id);
        res.status(200).json(result);
    } catch (error: any) {
        if (error.message === "Invalid ID") {
            return res.status(400).json("{ error: error.message }");
        }
        if (error.message === "Customer not found") {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}