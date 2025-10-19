import * as bookingService from '../services/booking.service';
import { Request, Response } from 'express';

export const getBookings = async (req: Request, res: Response) => {
    try {
        const bookings = await bookingService.getAllBookings();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving bookings', error });
    }
};




export const getBookingById = async (req: Request, res: Response) => {
    const booking_id = parseInt(req.params.id);
    try {
        const booking = await bookingService.getBookingDetails(booking_id);
        res.status(200).json(booking);
    } catch (error: any) {
        res.status(404).json({ message: 'Booking not found'});
    }
}

export const createBooking = async (req: Request, res: Response) => {
    const bookingData = req.body;
    try {
        const result = await bookingService.createBooking(bookingData);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error });
    }
}

export const deleteBooking = async (req: Request, res: Response) => {
    const booking_id = parseInt(req.params.id);
    try {
        const result = await bookingService.deleteBooking(booking_id);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error deleting booking', error });
    }
}

export const updateBooking = async (req: Request, res: Response) => {
    const booking_id = parseInt(req.params.id);
    const bookingData = req.body;
    try {
        const result = await bookingService.updateBooking(booking_id, bookingData);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error updating booking', error });
        
    }
}