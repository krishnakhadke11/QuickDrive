import { Cab } from "./Cab";
import { CabStatus } from "./CabStatus";

export interface DriverOps{
    startTime?: string;
    endTime?: string;
    cabStatus?: CabStatus
    cab?: Cab;
}