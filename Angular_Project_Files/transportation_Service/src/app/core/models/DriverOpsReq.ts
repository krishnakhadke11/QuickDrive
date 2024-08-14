import { Cab } from "./Cab";
import { CabStatus } from "./CabStatus";

export interface DriverOps{
    startTime?: string;
    endTime?: string;
    status?: CabStatus
    cab?: Cab;
}