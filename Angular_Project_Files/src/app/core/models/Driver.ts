import { UserResponse } from "./UserResponse";

export interface Driver {
    id: number;
    driversLicense: string;
    user: UserResponse;
}