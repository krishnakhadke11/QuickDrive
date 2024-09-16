import { BookingStatus } from "./BookingStatus";
import { Customer } from "./Customer";
import { PaymentType } from "./PaymentType";
import { Ride } from "./Ride";
import { SeatingCapacity } from "./SeatingCapacity";

export interface RideRequestResponse {
    id: number;
    pickupLocation: string;
    pickupName : string;
    dropLocation: string;
    dropName:string;
    distance: string;
    duration: string;
    fare: number;
    paymentType: PaymentType;
    seatingCapacity: SeatingCapacity;
    bookingStatus: BookingStatus;
    createdAt: string; 
    customer: Customer;
    ride?: Ride; 
}


