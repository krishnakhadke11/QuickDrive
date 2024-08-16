import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RideRequest } from '../models/RideRequest';
import { Observable, Subscription } from 'rxjs';
import { RideRequestResponse } from '../models/RideRequestResponse';
import { Ride } from '../models/Ride';

@Injectable({
  providedIn: 'root'
})
export class RideRequestService implements OnDestroy{

  url = environment.BASE_URL;
  checkStatusSubscription : Subscription | undefined;
  constructor(private http : HttpClient) { }
  
  //For Customer
  createRideRequest(rideRequest : RideRequest){
    return this.http.post(this.url + 'riderequest',rideRequest);
  }

  getRideRequest(rideId : number){
    return this.http.get<RideRequestResponse>(this.url + `riderequest/${rideId}/ride`);
  }

  //For Driver
  getAllRideRequestsAsPerDriverOps() : Observable<RideRequest[]>{
    return this.http.get<RideRequest[]>(this.url + 'riderequest/driver');
  }
  
  acceptRideRequest(id : number) : Observable<Ride>{
    return this.http.get<Ride>(this.url + `riderequest/driver/accept/${id}`)
  }

  deleteRideReq(id : number) : Observable<string> {
    return this.http.delete<string>(this.url + `riderequest/${id}`,{responseType : 'text' as 'json'})
  }

  ngOnDestroy(): void {
    this.checkStatusSubscription?.unsubscribe()
  }
}
