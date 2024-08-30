import { SeatingCapacity } from "../SeatingCapacity";
import { UserResponse } from "../UserResponse";
import { UserIdRequest } from "./UserIdRequest";

export interface CabRequest {
    registerNo: string;
    seatingCapacity: SeatingCapacity;
    color: string; 
    model: string;
    user: UserIdRequest;
}