export interface createCustomerDTO {
    firstName: string;
    lastName: string;
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
