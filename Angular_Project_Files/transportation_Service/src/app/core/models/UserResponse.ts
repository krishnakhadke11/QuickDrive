export interface UserResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string; // Typically, you wouldn't expose passwords, consider removing this if not needed
    phoneNumber: string;
    address: string;
    role: any;
    createdAt: string; // Assuming ISO 8601 date string
    updatedAt: string; // Assuming ISO 8601 date string
}