import * as userRepository from '../repositories/users.repository'
import { newUser } from '../types/users.types';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();



export const getAllUsers = async () => {
    return await userRepository.getUsers();
}

export const insertUser = async (userData: newUser) => {
  
    if(!userData) {
        throw new Error("User data is required");
    }
    
    const newUser = await userRepository.insertUser(userData);
    return newUser;
}

export const loginUser = async (email_address: string, password: string) => {
    if(!email_address || !password) {
        throw new Error("Email and password are required");
    }
    const user = await userRepository.getUserByEmailAddress(email_address);
    if(!user) {
        throw new Error("Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        throw new Error("Invalid email or password");
    }
    const payload = { 
        sub: user.user_id,
        email: user.email_address,
        userName: user.user_name,
        exp: Math.floor(Date.now() / 1000) + (60 * 60)
     };   
   
     const secret = process.env.JWT_SECRET as string;
    if (!secret) throw new Error('JWT secret not defined');
    const token = jwt.sign(payload, secret);
    return{
        message:"Login successful",
        token: token,
        user:{
            userid: user.userid,
            first_name: user.first_name,
            last_name: user.last_name,
            user_name: user.user_name,
            email_address: user.email_address,
            phone_number: user.phone_number
        }
    }
}