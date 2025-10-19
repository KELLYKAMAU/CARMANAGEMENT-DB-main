import * as userService from '../services/users.service';

import { Request, Response } from 'express';


export const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error:any) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}

export const createUser = async (req:Request, res:Response) => {
    const userData = req.body;

  try {

    const newUser = await userService.insertUser(userData);
    res.status(201).json({message: 'User created successfully', user: newUser});
    
} catch (error:any) {

    if(error.message === "User data is required") {
        return res.status(400).json({error: error.message});
    }else if(error.message === "Username or Email already exists") {
        return res.status(409).json({error: error.message});
    }

    res.status(500).json({ error: "Internal Server Error", details: error.message });
}
    
}


export const loginUser = async (req:Request, res:Response) => {
    const { email_address, password } = req.body;   
    try {
        const result = await userService.loginUser(email_address, password);
        res.status(200).json(result);
    }   catch (error:any) {
        if(error.message === "Email and password are required") {
            return res.status(400).json({error: error.message});
        }else if(error.message === "Invalid email or password") {
            return res.status(401).json({error: error.message});
        }else if(error.message === "User not found") {
            return res.status(404).json({error: error.message});
        }else{
            res.status(500).json({ error: "Internal Server Error", details: error.message });
        }


    }}