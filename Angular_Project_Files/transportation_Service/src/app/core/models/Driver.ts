import { UserResponse } from "./UserResponse";

export interface Driver {
    id: number;
    driversLicense: string;
    startTime: string; // Assuming ISO 8601 time string
    endTime?: string; // Optional
    user: UserResponse;
}