import { PaymentStatus } from "./PaymentStatus";
import { PaymentType } from "./PaymentType";
import { Ride } from "./Ride";

export interface Payment{
    id : number,
    paymentType : PaymentType,
    paymentStatus : PaymentStatus,
    ride : Ride
}