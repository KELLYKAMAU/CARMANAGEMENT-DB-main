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
       if(user.PasswordHash) {
        const hashedPassword = await bcrypt.hash(user.PasswordHash, 10);        
        user.PasswordHash=hashedPassword;
    }
     await pool.request()
        .input('Email', user.email_address)
        .input('PasswordHash', user.PasswordHash)
        .input('FirstName', user.first_name)
        .input('LastName', user.last_name)
        .input('Role', user.Role || 'user') // Default role is 'user'
        .query('INSERT INTO dbo.Users (Email,PasswordHash,FirstName,LastName,Role) VALUES (@Email,@PasswordHash,@FirstName,@LastName,@Role)');
        
    return { message: 'User created successfully' };
}   ;

    

export const getUserByEmailAddress = async (email_address: string) => {
    const pool = await getPool();
    const result = await pool.request()
        .input('email_address', email_address)
        .query('SELECT * FROM dbo.Users WHERE Email = @email_address');
    return result.recordset[0] || null;    
}

export const setVerificationCode = async (email_address: string, code: string) => {
    const pool = await getPool();
    await pool.request()
        .input('email_address', email_address)
        .input('verification_code', code)
        .query('UPDATE Users SET verification_code = @verification_code WHERE Email  = @email_address');
}
export const verifyUserEmail = async (email_address: string) => {
    const pool = await getPool();
    const result = await pool.request()
        .input('email_address', email_address)
        .query('UPDATE dbo.Users SET is_verified = 1, verification_code = NULL WHERE Email = @email_address');
    return result.recordset[0] || null;
}

export const deleteUserByEmailAddress = async (email_address: string) => {
    const pool = await getPool();
    await pool.request()
        .input('email_address', email_address)
        .query('DELETE FROM dbo.Users WHERE Email = @email_address');
}