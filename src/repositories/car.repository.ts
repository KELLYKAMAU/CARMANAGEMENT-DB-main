
import { getPool } from '../db/config';
import { CarUpdate, NewCar } from '../types/car.types';

export const getAllCars = async () => {
    const pool = await getPool();
    const result = await pool.request().query('SELECT * FROM Car');
    return result.recordset;}

export const addCar = async(carData:NewCar) => {
     const pool = await getPool();
    await pool
    .request()
    .input('car_model', carData.car_model)   
    .input('manufucturer', carData.manufucturer)
    .input('year', carData.year)
    .input('color', carData.color)
    .input('rental_rate', carData.rental_rate)
    .input('availability', carData.availability)
    .query('INSERT INTO Car (car_model, manufucturer, year, color, rental_rate, availability) VALUES (@car_model,@manufucturer, @year, @color, @rental_rate, @availability)'    );
    return{ message: 'Car added successfully' };
}


export const getCarById = async (car_id: number) => {
    const pool = await getPool();
    const result = await pool
      .request()
      .input('car_id', car_id)
      .query('SELECT * FROM Car WHERE car_id = @car_id');
    return result.recordset[0];
  }

export const deleteCar = async (car_id: number) => {
    const pool= await getPool();
    await pool
    .request()
    .input('car_id', car_id)
    .query('DELETE FROM Car WHERE car_id = @car_id');
    return { message: 'Car deleted successfully' };
}  


export const updateCar = async (car_id: number, carData: CarUpdate) => {
  const pool = await getPool();
  await pool
  .request()
  .input('car_id', car_id)
  .input('car_model', carData.car_model)
  .input('manufucturer', carData.manufucturer)
  .input('year', carData.year)
  .input('color', carData.color)
  .input('rental_rate', carData.rental_rate)
  .input('availability', carData.availability)
  .query('UPDATE Car SET car_model = @car_model, manufucturer = @manufucturer, year = @year, color = @color, rental_rate = @rental_rate, availability = @availability WHERE car_id = @car_id');
  return { message: 'Car updated successfully' };  
 

  
}