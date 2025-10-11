
import { Request, Response } from 'express';
import * as service from '../services/location.service';

export const createLocation = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const location = await service.createLocation(payload);
    return res.status(201).json({ success: true, data: location });
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message || 'Failed to create location' });
  }
};

export const getLocations = async (_req: Request, res: Response) => {
  try {
    const locations = await service.getAllLocations();
    return res.json({ success: true, data: locations });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message || 'Failed to fetch locations' });
  }
};

export const getLocationById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid id' });

    const location = await service.getLocationById(id);
    if (!location) return res.status(404).json({ success: false, message: 'Location not found' });
    return res.json({ success: true, data: location });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message || 'Failed to fetch location' });
  }
};

export const updateLocation = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid id' });

    const updated = await service.updateLocation(id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: 'Location not found' });
    return res.json({ success: true, data: updated });
  } catch (err: any) {
    return res.status(400).json({ success: false, message: err.message || 'Failed to update location' });
  }
};

export const deleteLocation = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).json({ success: false, message: 'Invalid id' });

    const deleted = await service.deleteLocation(id);
    if (!deleted) return res.status(404).json({ success: false, message: 'Location not found' });
    return res.json({ success: true, data: deleted });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message || 'Failed to delete location' });
  }
};
