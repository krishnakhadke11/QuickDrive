import { CabIdRequest } from "./CabIdRequest";
import { CustomerIdRequest } from "./CustomerIdRequest";
import { DriverIdRequest } from "./DriverIdRequest";
import { PaymentType } from "./PaymentType";

export interface RideRequestDto {
    pickupLocation: string;
    pickupName:string;
    dropLocation: string;
    dropName : string;
    rating?: number
    fare: number;
    distance: string; 
    duration: string; 
    paymentType: PaymentType; 
    customer: CustomerIdRequest; 
    cab: CabIdRequest; 
    driver: DriverIdRequest; 
}