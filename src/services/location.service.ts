
import {
  createLocation as repoCreate,
  getAllLocations as repoGetAll,
  getLocationById as repoGetById,
  updateLocation as repoUpdate,
  deleteLocation as repoDelete
} from '../repositories/location.repository';
import { CreateLocationDTO, UpdateLocationDTO, Location } from '../Types/location.type';

export const createLocation = async (payload: CreateLocationDTO): Promise<Location> => {
  if (!payload.Name || !payload.Address) {
    throw new Error('Name and Address are required');
  }
  return repoCreate(payload);
};

export const getAllLocations = async (): Promise<Location[]> => {
  return repoGetAll();
};

export const getLocationById = async (id: number): Promise<Location | null> => {
  return repoGetById(id);
};

export const updateLocation = async (id: number, payload: UpdateLocationDTO): Promise<Location | null> => {
  if (Object.keys(payload).length === 0) throw new Error('No update fields provided');
  return repoUpdate(id, payload);
};

export const deleteLocation = async (id: number): Promise<Location | null> => {
  return repoDelete(id);
};
