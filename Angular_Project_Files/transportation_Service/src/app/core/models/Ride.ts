import { Cab } from "./Cab";
import { Customer } from "./Customer";
import { Driver } from "./Driver";
import { PaymentType } from "./PaymentType";

export interface Ride {
    id: number;
    pickupLocation: string;
    pickupName:string;
    dropLocation: string;
    dropName : string;
    rating : number
    fare : number;
    distance : string; 
    duration : string; 
    paymentType: PaymentType; 
    customer: Customer; 
    cab : Cab; 
    driver : Driver; 
}