import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ride } from '../models/Ride';
import { environment } from '../../../environments/environment';
import { EMPTY, Observable } from 'rxjs';
import { RideRequestDto } from '../models/RideRequestDto';
import { Payment } from '../models/Payment';
import { DriverRatingResponse } from '../models/DriverRatingResponse';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  url = environment.BASE_URL;
  constructor(private http : HttpClient) { }

  getCustomersRides() : Observable<Ride[]> {
    return this.http.get<Ride[]>(this.url + 'customers/rides');
  }

  createRide(rideData : RideRequestDto) : Observable<Ride>{
    return this.http.post<Ride>(this.url + 'rides',rideData);
  }

  getPaymentByRideId(rideId : number) : Observable<Payment> {
    return this.http.get<Payment>(this.url + `rides/${rideId}/payments`);
  }

  updateRating(rideId : number,rating : number) : Observable<Ride>{
    const ratingUpdate : any = {
      rating : rating
    }

    return this.http.patch<Ride>(this.url + `rides/${rideId}/rating`,ratingUpdate);
  }
}
