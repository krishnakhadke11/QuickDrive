import { PaymentType } from "./PaymentType"
import { SeatingCapacity } from "./SeatingCapacity"

export interface RideRequest{
    pickupLocation? : string,
    dropLocation? : string,
    distance? : string,
    duration? : string,
    fare? : number
    paymentType : PaymentType,
    seatingCapacity? : SeatingCapacity
}