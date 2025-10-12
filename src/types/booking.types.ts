export interface Booking {    
    customer_id: number;
    car_id: number;
    rental_start_date: Date;
    rental_end_date: Date;
    total_amount: number;
}

export interface BookingUpdate {
    customer_id?: number;
    car_id?: number;
    rental_start_date?: Date;
    rental_end_date?: Date;
    total_amount?: number;
}