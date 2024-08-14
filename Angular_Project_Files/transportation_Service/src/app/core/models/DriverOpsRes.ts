import { Cab } from "./Cab";
import { CabStatus } from "./CabStatus";
import { Driver } from "./Driver";

export interface DriverOpsRes{
    id : number;
    startTime : string;
    endTime : String;
    status : CabStatus;
    driver : Driver;
    cab : Cab;
}