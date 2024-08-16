import { PaymentType } from "./PaymentType"
import { SeatingCapacity } from "./SeatingCapacity"

export interface RideRequest{
    id?:number;
    pickupLocation? : string,
    pickupName? : string,
    dropLocation? : string,
    dropName? : string,
    distance? : string,
    duration? : string,
    fare? : number
    paymentType : PaymentType,
    seatingCapacity? : SeatingCapacity
}