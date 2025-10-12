import * as carRepositories from "../repositories/car.repository";

export const listAllCars = async () => {
    return await carRepositories.getAllCars();
}

export const createCar = async (carData: any) => {
    return await carRepositories.addCar(carData);
}


export const getCarDetails = async (id: number) => {
     if (isNaN(id) || id <= 0) {
        throw new Error('Invalid car ID');
    }   

    const car = await carRepositories.getCarById(id);
    if (!car) {
        throw new Error('Car not found');
    }

    return car;
}

export const removeCar = async (id: number) => {
    if (isNaN(id) || id <= 0) {
        throw new Error('Invalid car ID');
    }

    const car = await carRepositories.getCarById(id);
    if (!car) {
        throw new Error('Car not found');
    }
    
    await carRepositories.deleteCar(id);
    
    return { message: 'Car deleted successfully' };
}


export const modifyCar = async (id: number, carData: any) => {
    if (isNaN(id) || id <= 0) {
        throw new Error('Invalid car ID');
    }
    const car = await carRepositories.getCarById(id);
    if (!car) {
        throw new Error('Car not found');
    }
    return await carRepositories.updateCar(id, carData);
}