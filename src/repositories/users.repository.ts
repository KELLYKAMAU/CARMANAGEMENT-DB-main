import { getPool } from "../db/config";
import { newUser } from "../types/users.types";
import bcrypt from 'bcrypt';

export const getUsers = async () => {
    const pool = await getPool();
    const result = await pool.request().query('SELECT * FROM Users');
    return result.recordset;
}

export const insertUser = async (user: newUser) => {

    const pool = await getPool();
       if(user.password) {
        const hashedPassword = await bcrypt.hash(user.password, 10);        
        user.password = hashedPassword;
    }
     await pool.request()    
        .input('first_name', user.first_name)
        .input('last_name', user.last_name)
        .input('user_name', user.user_name)
        .input('password', user.password)
        .input('email_address', user.email_address)
        .input('phone_number', user.phone_number)
        .query('INSERT INTO Users (first_name, last_name, user_name, password, email_address, phone_number) VALUES (@first_name, @last_name, @user_name, @password, @email_address, @phone_number)');
        
    return { message: 'User created successfully' };
}   ;
    

export const getUserByEmailAddress = async (email_address: string) => {
    const pool = await getPool();
    const result = await pool.request()
        .input('email_address', email_address)
        .query('SELECT * FROM Users WHERE email_address = @email_address');
    return result.recordset[0] || null;    
}