
import { getPool } from '../db/config';
import sql from 'mssql';
import { Location, CreateLocationDTO, UpdateLocationDTO } from '../Types/location.type';

export const createLocation = async (payload: CreateLocationDTO): Promise<Location> => {
  const pool = await getPool();
  const result = await pool.request()
    .input('Name', sql.NVarChar(100), payload.Name)
    .input('Address', sql.NVarChar(255), payload.Address)
    .input('ContactNumber', sql.NVarChar(30), payload.ContactNumber ?? null)
    .query(`
      INSERT INTO dbo.Locations (Name, Address, ContactNumber)
      OUTPUT INSERTED.Id, INSERTED.Name, INSERTED.Address, INSERTED.ContactNumber
      VALUES (@Name, @Address, @ContactNumber);
    `);
  return result.recordset[0];
};

export const getAllLocations = async (): Promise<Location[]> => {
  const pool = await getPool();
  const result = await pool.request().query('SELECT Id, Name, Address, ContactNumber FROM dbo.Locations ORDER BY Id');
  return result.recordset;
};

export const getLocationById = async (id: number): Promise<Location | null> => {
  const pool = await getPool();
  const result = await pool.request().input('Id', sql.Int, id)
    .query('SELECT Id, Name, Address, ContactNumber FROM dbo.Locations WHERE Id = @Id');
  return result.recordset[0] ?? null;
};

export const updateLocation = async (id: number, payload: UpdateLocationDTO): Promise<Location | null> => {
  const existing = await getLocationById(id);
  if (!existing) return null;

  const newName = payload.Name ?? existing.Name;
  const newAddress = payload.Address ?? existing.Address;
  const newContact = (payload.ContactNumber === undefined) ? existing.ContactNumber : payload.ContactNumber;

  const pool = await getPool();
  const result = await pool.request()
    .input('Id', sql.Int, id)
    .input('Name', sql.NVarChar(100), newName)
    .input('Address', sql.NVarChar(255), newAddress)
    .input('ContactNumber', sql.NVarChar(30), newContact ?? null)
    .query(`
      UPDATE dbo.Locations
      SET Name = @Name, Address = @Address, ContactNumber = @ContactNumber
      OUTPUT INSERTED.Id, INSERTED.Name, INSERTED.Address, INSERTED.ContactNumber
      WHERE Id = @Id;
    `);

  return result.recordset[0] ?? null;
};

export const deleteLocation = async (id: number): Promise<Location | null> => {
  const pool = await getPool();
  const result = await pool.request()
    .input('Id', sql.Int, id)
    .query(`
      DELETE FROM dbo.Locations
      OUTPUT DELETED.Id, DELETED.Name, DELETED.Address, DELETED.ContactNumber
      WHERE Id = @Id;
    `);
  return result.recordset[0] ?? null;
};
