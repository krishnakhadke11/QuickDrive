import { Cab } from "../Cab";
import { CabStatus } from "../CabStatus";
import { CabIdRequest } from "./CabIdRequest";

export interface DriverOpsReq{
    startTime : string;
    endTime : String;
    cabStatus : CabStatus;
    cab : CabIdRequest;
}