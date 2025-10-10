
// type customer
export interface customer {
    customerid: number;
    customer_name: string;
    description: string;
    due_date: string;
    user_id: number;
}

// type creating new customer
export interface Newcustomer {
    customer_name: string;
    description: string;
    due_date: string;
    user_id: number;
}

// type updating customer
export interface Updatecustomer {
    customer_name: string;
    description: string;
    due_date: string;
    user_id: number;
}