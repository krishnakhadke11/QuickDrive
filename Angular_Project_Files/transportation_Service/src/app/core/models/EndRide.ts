export interface EndRide{
    rideId : number;
    pickupName : string;
    dropName : string;
    fare : number;
    distance : string;
    duration : string;
    customer : {
      email : string;
      fullname : string
    }
}