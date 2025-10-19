import { error } from "console";
import { getPool } from "../db/config";
import { locationData, updatedLocation } from "../types/location.type";

export const getLocations = async () => {
    const pool = await getPool();
    const result = await pool.query("SELECT * FROM Location");
    return result.recordset;
};


export const getLocationDetails =async(location_id:number)=>{
    const pool= await getPool()
    
    if(!location_id){
        throw  error("Location not found")
    }
   const result=  await pool.request()
    .input("location_id",location_id)

    .query('SELECT * FROM Location WHERE location_id= @location_id')

    return result.recordset[0];
}

export const createLocation = async(locationData:locationData)=>{
    const pool= await getPool()
   const result=  await pool.request()
    .input("car_id",locationData.car_id)
    .input("location_name",locationData.location_name)
    .input("address",locationData.address)
    .input("contact_number",locationData.contact_number)
    .query('INSERT INTO Location (car_id, location_name, address, contact_number) VALUES (@car_id, @location_name, @address, @contact_number)')
   return result.recordset;
}

export const updateLocation = async(location_id:number, locationData:Partial<updatedLocation>)=>{
    const pool= await getPool()
    const existingLocation = await getLocationDetails(location_id)
    if(!existingLocation){
        throw error("Location details not found")
    }
    const updatedLocation = {...existingLocation,...locationData}
   const result=  await pool.request()
    .input("location_id",location_id)
    .input("car_id",updatedLocation.car_id)
    .input("location_name",updatedLocation.location_name)
    .input("address",updatedLocation.address)
    .input("contact_number",updatedLocation.contact_number)
    .query('UPDATE Location SET car_id=@car_id, location_name=@location_name, address=@address, contact_number=@contact_number WHERE location_id=@location_id')
   return result.recordset;
}


export const deleteLocation = async(location_id:number)=>{
    const pool = await getPool()
    await pool
    .request()
    .input("location_id",location_id)
    .query('DELETE FROM Location WHERE location_id=@location_id')
     return("Location deleted successfully")
    }