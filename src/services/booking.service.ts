import * as bookingRepository from '../repositories/booking.repository';
import { Booking,BookingUpdate } from '../types/booking.types';

export const getAllBookings = async () => {
    return await bookingRepository.getBookings();
}

export const getBookingDetails = async (booking_id: number) => {
    if (isNaN(booking_id) || booking_id <= 0) {
        throw new Error('Invalid booking ID');
    }

    const booking = await bookingRepository.getBookingById(booking_id);
    if (!booking) {
        throw new Error('Booking not found');
    }

    return await bookingRepository.getBookingById(booking_id);
}

export const createBooking = async (bookingData: Booking) => {
    
    await bookingRepository.createBooking(bookingData);
    return { message: 'Booking created successfully' };
}

export const deleteBooking = async (booking_id: number) => {
    await bookingRepository.deleteBooking(booking_id);
    return { message: 'Booking deleted successfully' };
}

export const updateBooking = async (booking_id: number, bookingData: Partial<BookingUpdate | Booking>) => {
    if (isNaN(booking_id) || booking_id <= 0) {
        throw new Error('Invalid booking ID');
    }

    const existingBooking = await bookingRepository.getBookingById(booking_id);
    if (!existingBooking) {
        throw new Error('Booking not found');
    }

    return await bookingRepository.updateBooking(booking_id, bookingData);
}