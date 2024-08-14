export interface UserResponse {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    phoneNumber?: string;
    address?: string;
    role?: any;
    createdAt?: string; // Assuming ISO 8601 date string
    updatedAt?: string; // Assuming ISO 8601 date string
}