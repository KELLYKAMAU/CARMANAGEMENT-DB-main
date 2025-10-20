import { getPool } from "../db/config";
import { newUser } from "../types/users.types";
import bcrypt from 'bcrypt';

export const getUsers = async () => {
    const pool = await getPool();
    const result = await pool.request().query('SELECT * FROM dbo.Users');
    return result.recordset;
}

export const insertUser = async (user: newUser) => {

    const pool = await getPool();
       if(user.password) {
        const hashedPassword = await bcrypt.hash(user.password, 10);        
        user.password = hashedPassword;
    }
     await pool.request()  
        .input('FirstName', user.first_name)
        .input('LastName', user.last_name)
        // .input('user_name', user.user_name)
        // .input('password', user.password)
        .input('Email', user.email_address)
        .input('Role', user.Role || 'user') // Default role is 'user'
        .query('INSERT INTO dbo.Users (firstName,LastName,Email, Role) VALUES (@FirstName, @LastName, @Email,  @Role)');
        
    return { message: 'User created successfully' };
}   ;
    

export const getUserByEmailAddress = async (email_address: string) => {
    const pool = await getPool();
    const result = await pool.request()
        .input('email_address', email_address)
        .query('SELECT * FROM dbo.Users WHERE email_address = @email_address');
    return result.recordset[0] || null;    
}

export const setVerificationCode = async (email_address: string, code: string) => {
    const pool = await getPool();
    await pool.request()
        .input('email_address', email_address)
        .input('verification_code', code)
        .query('UPDATE Users SET verification_code = @verification_code WHERE email_address = @email_address');
}
export const verifyUserEmail = async (email_address: string) => {
    const pool = await getPool();
    const result = await pool.request()
        .input('email_address', email_address)
        .query('UPDATE dbo.Users SET is_verified = 1, verification_code = NULL WHERE email_address = @email_address');
    return result.recordset[0] || null;
}

export const deleteUserByEmailAddress = async (email_address: string) => {
    const pool = await getPool();
    await pool.request()
        .input('email_address', email_address)
        .query('DELETE FROM dbo.Users WHERE email_address = @email_address');
}