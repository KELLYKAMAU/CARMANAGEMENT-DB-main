import { getPool } from "../db/config";
import { newUser } from "../types/users.types";
import bcrypt from 'bcrypt';

export const getusers = async () => {
    const pool = await getPool();
    const result = await pool.request().query('SELECT * FROM users');
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
        .input('role', user.role || 'user') // Default role is 'user'
        .query('INSERT INTO users (first_name, last_name, user_name, password, email_address, , role) VALUES (@first_name, @last_name, @user_name, @password, @email_address, @, @role)');
        
    return { message: 'User created successfully' };
}   ;
    

export const getUserByEmailAddress = async (email_address: string) => {
    const pool = await getPool();
    const result = await pool.request()
        .input('email_address', email_address)
        .query('SELECT * FROM users WHERE email_address = @email_address');
    return result.recordset[0] || null;    
}

export const setVerificationCode = async (email_address: string, code: string) => {
    const pool = await getPool();
    await pool.request()
        .input('email_address', email_address)
        .input('verification_code', code)
        .query('UPDATE users SET verification_code = @verification_code WHERE email_address = @email_address');
}
export const verifyUserEmail = async (email_address: string) => {
    const pool = await getPool();
    const result = await pool.request()
        .input('email_address', email_address)
        .query('UPDATE users SET is_verified = 1, verification_code = NULL WHERE email_address = @email_address');
    return result.recordset[0] || null;
}

export const deleteUserByEmailAddress = async (email_address: string) => {
    const pool = await getPool();
    await pool.request()
        .input('email_address', email_address)
        .query('DELETE FROM users WHERE email_address = @email_address');
}