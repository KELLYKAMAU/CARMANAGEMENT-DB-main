export interface newUser {
    Role: string;
    first_name: string;
    last_name: string;
    user_name: string;
    password: string;
    email_address: string;    
    phone_number: string;    
}
export interface updateUser {
    first_name?: string;
    last_name?: string;
    user_name?: string;
    password?: string;
    email_address?: string;    
    phone_number?: string;    
}
