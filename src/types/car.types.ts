export interface NewCar {
    car_id: number;
    car_model: string;
    manufucturer: string;
    year: number;
    color: string;
    rental_rate: number;
    availability: boolean;
}

export interface CarUpdate {
    car_model?: string;
    manufucturer?: string;
    year?: number;
    color?: string;
    rental_rate?: number;
    availability?: boolean;
}