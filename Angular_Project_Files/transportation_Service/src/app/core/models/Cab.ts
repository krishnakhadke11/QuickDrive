import { SeatingCapacity } from "./SeatingCapacity";
import { UserResponse } from "./UserResponse";

export interface Cab {
    id: number;
    registerNo: string;
    seatingCapacity: SeatingCapacity;
    color?: string; // Optional
    model: string;
    user: UserResponse;
}