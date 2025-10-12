//bad request

import e, { Request, Response } from 'express';
import { getPool } from '../db/config';
import sql from 'mssql';
import * as carServices from '../services/car.service';



export const getAllCars = async (req: Request, res: Response) => {
    try {        
        const cars = await carServices.listAllCars();
        res.status(200).json(cars);
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({ message: 'Internal server error' });
        
    }
}

export const addCar = async(req: Request, res: Response) => {
    const todo = req.body;
    const result = await carServices.createCar(todo);   
    res.status(201).json(result);
}


export const getCarById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
        const car = await carServices.getCarDetails(id);
        res.status(200).json(car);
    } catch (error: any) {
        if (error.message === 'Invalid car ID') {
            return res.status(400).json({ message: error.message });
        }else if (error.message === 'Car not found') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const deleteCar = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        const result = await carServices.removeCar(id);
        res.status(200).json(result);
    } catch (error: any) {
        if (error.message === 'Invalid car ID') {
            return res.status(400).json({ message: error.message });
        }
        else if (error.message === 'Car not found') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}



export const updateCar = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const carData = req.body;
    try {
        const result = await carServices.modifyCar(id, carData);
        res.status(200).json(result);
    } catch (error: any) {
        if (error.message === 'Invalid car ID') {
            return res.status(400).json({ message: error.message });
        }
        else if (error.message === 'Car not found') {
            return res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}