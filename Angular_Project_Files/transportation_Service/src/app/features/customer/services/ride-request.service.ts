import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { RideRequest } from '../../../core/models/RideRequest';
import { Subscription } from 'rxjs';
import { RideRequestResponse } from '../../../core/models/RideRequestResponse';

@Injectable({
  providedIn: 'root'
})
export class RideRequestService implements OnDestroy{
  checkStatusSubscription : Subscription | undefined;
  constructor(private http : HttpClient) { }
  

  createRideRequest(rideRequest : RideRequest){
    return this.http.post(environment.BASE_URL + 'riderequest',rideRequest);
  }

  getRideRequest(rideId : number){
    return this.http.get<RideRequestResponse>(environment.BASE_URL + `riderequest/${rideId}/ride`);
  }


  ngOnDestroy(): void {
    this.checkStatusSubscription?.unsubscribe()
  }
}
