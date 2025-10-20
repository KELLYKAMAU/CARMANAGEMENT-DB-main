export interface createCustomerDTO {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    address: string;
}

export interface updateCustomerDTO {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone_number?: string;
    address?: string;
}
