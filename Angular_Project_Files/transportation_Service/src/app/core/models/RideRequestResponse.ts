import { BookingStatus } from "./BookingStatus";
import { Customer } from "./Customer";
import { PaymentType } from "./PaymentType";
import { Ride } from "./Ride";
import { SeatingCapacity } from "./SeatingCapacity";

export interface RideRequestResponse {
    id: number;
    pickupLocation: string;
    dropLocation: string;
    distance: string;
    duration: string;
    fare: number;
    paymentType: PaymentType;
    seatingCapacity: SeatingCapacity;
    bookingStatus: BookingStatus;
    requestTime: string; // Assuming ISO 8601 date string
    customer: Customer;
    ride?: Ride; // Optional, since it can be null
}


