import { Cab } from "./Cab";
import { Customer } from "./Customer";
import { Driver } from "./Driver";
import { PaymentType } from "./PaymentType";

export interface Ride {
    id: number;
    pickupLocation: string;
    dropLocation: string;
    rating?: number; // Optional, as it might not be set initially
    fare?: number;   // Optional, as it might not be set initially
    distance?: string; // Optional
    duration?: string; // Optional
    paymentType?: PaymentType; // Optional
    customer?: Customer; // Optional, since it can be null
    cab?: Cab; // Optional, since it can be null
    driver?: Driver; // Optional, since it can be null
}