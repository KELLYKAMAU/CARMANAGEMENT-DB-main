import { getPool } from '../db/config';
import sql from 'mssql';

export async function listCustomers() {
  const pool = await getPool();
  return (await pool.request().query('SELECT * FROM dbo.Customers')).recordset;
}

export async function getCustomer(id: number) {
  const pool = await getPool();
  const r = await pool.request()
    .input('id', sql.Int, id)
    .query('SELECT * FROM dbo.Customers WHERE Id = @id');
  return r.recordset[0] || null;
}

export async function createCustomer(c: any) {
  const pool = await getPool();
  const r = await pool.request()
    .input('fn', sql.NVarChar, c.firstName)
    .input('ln', sql.NVarChar, c.lastName)
    .input('email', sql.NVarChar, c.email)
    .input('phone', sql.NVarChar, c.phoneNumber || null)
    .input('addr', sql.NVarChar, c.address || null)
    .query(`
      INSERT INTO dbo.Customers (FirstName, LastName, Email, PhoneNumber, Address, CreatedAt)
      OUTPUT INSERTED.*
      VALUES (@fn, @ln, @email, @phone, @addr, SYSUTCDATETIME())
    `);
  return {message:'Customer created successfully'};
}

export async function updateCustomer(id: number, c: any) {
  const pool = await getPool();
  const r = await pool.request()
    .input('id', sql.Int, id)
    .input('fn', sql.NVarChar, c.firstName)
    .input('ln', sql.NVarChar, c.lastName)
    .input('email', sql.NVarChar, c.email)
    .input('phone', sql.NVarChar, c.phoneNumber)
    .input('addr', sql.NVarChar, c.address)
    .query(`
      UPDATE dbo.Customers SET
        FirstName   = COALESCE(@fn, FirstName),
        LastName    = COALESCE(@ln, LastName),
        Email       = COALESCE(@email, Email),
        PhoneNumber = COALESCE(@phone, PhoneNumber),
        Address     = COALESCE(@addr, Address),
        UpdatedAt   = SYSUTCDATETIME()
      OUTPUT INSERTED.*
      WHERE Id = @id
    `);
    return {message:'customer updated successfully'};
}

export async function deleteCustomer(id: number) {
  const pool = await getPool();
  await pool.request()
    .input('id', sql.Int, id)
    .query('DELETE FROM dbo.Customers WHERE Id = @id');
}