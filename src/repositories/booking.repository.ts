import { getPool } from "../db/config";
import { Booking,BookingUpdate } from "../types/booking.types";


export const getBookings = async () => {
    const pool = await getPool();
    const result = await pool
    .request()
    .query('SELECT * FROM Booking');
    return result.recordset;
}


export const getBookingById = async (booking_id: number) => {
    const pool = await getPool();
    const result = await pool
    .request()
    .input('booking_id', booking_id)
    .query('SELECT * FROM Booking WHERE booking_id = @booking_id');
    return result.recordset[0];
};


export const createBooking = async (bookingData: Booking) => {
    const pool = await getPool();
    await pool
    .request()
    .input('customer_id', bookingData.customer_id)
    .input('car_id', bookingData.car_id)
    .input('rental_start_date', bookingData.rental_start_date)
    .input('rental_end_date', bookingData.rental_end_date)
    .input('total_amount', bookingData.total_amount)
    .query('INSERT INTO Booking (customer_id, car_id, rental_start_date, rental_end_date, total_amount) VALUES (@customer_id, @car_id, @rental_start_date, @rental_end_date, @total_amount)');
    return { message: 'Booking created successfully' };
};

export const deleteBooking = async (booking_id: number) => {
    const pool = await getPool();
    await pool
    .request()
    .input('booking_id', booking_id)
    .query('DELETE FROM Booking WHERE booking_id = @booking_id');
};

export const updateBooking = async (booking_id: number, bookingData: Partial<BookingUpdate>) => {
    const pool = await getPool();
    const existingBooking = await getBookingById(booking_id);
    if (!existingBooking) {
        throw new Error('Booking not found');
    }
    const updatedBooking = { ...existingBooking, ...bookingData };
    await pool
    .request()
    .input('booking_id', booking_id)
    .input('customer_id', updatedBooking.customer_id)
    .input('car_id', updatedBooking.car_id)
    .input('rental_start_date', updatedBooking.rental_start_date)
    .input('rental_end_date', updatedBooking.rental_end_date)
    .input('total_amount', updatedBooking.total_amount)
    .query('UPDATE Booking SET customer_id = @customer_id, car_id = @car_id, rental_start_date = @rental_start_date, rental_end_date = @rental_end_date, total_amount = @total_amount WHERE booking_id = @booking_id');
    return { message: 'Booking updated successfully' };
        
    
}