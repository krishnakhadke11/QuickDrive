import { PaymentStatus } from "./PaymentStatus";
import { PaymentType } from "./PaymentType";
import { Ride } from "./Ride";
import { RideIdRequest } from "./RideIdRequest";

export interface PaymentRequest{
    paymentType : PaymentType,
    paymentStatus : PaymentStatus,
    ride : RideIdRequest
}