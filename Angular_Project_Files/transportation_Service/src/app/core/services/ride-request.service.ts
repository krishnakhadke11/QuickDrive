import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, EMPTY, Observable, Subscription, throwError } from 'rxjs';
import { RideRequestResponse } from '../models/RideRequestResponse';
import { Ride } from '../models/Ride';
import { NotificationService } from './notification.service';
import { RideIdRequest } from '../models/Requests/RideIdRequest';
import { RideRequest } from '../models/Requests/RideRequest';

@Injectable({
  providedIn: 'root'
})
export class RideRequestService implements OnDestroy{

  url = environment.BASE_URL;
  checkStatusSubscription : Subscription | undefined;
  constructor(private http : HttpClient,private notif : NotificationService) { }
  
  //For Customer
  createRideRequest(rideRequest : RideRequest) : Observable<RideRequestResponse>{
    return this.http.post<RideRequestResponse>(this.url + 'riderequests',rideRequest);
  }

  getRideRequest(rideId : number){
    return this.http.get<RideRequestResponse>(this.url + `riderequests/${rideId}/rides`);
  }

  //For Driver
  getAllRideRequestsAsPerDriverOps() : Observable<RideRequestResponse[]>{
    return this.http.get<RideRequestResponse[]>(this.url + 'drivers/riderequests').pipe(catchError((err) => {
      if(err instanceof HttpErrorResponse && err.status === 404){
        this.notif.showError("Driver is not operational");
        return EMPTY;
      }else{
        return throwError(() => err)
      }
    }));
  }
  
  // acceptRideRequest(id : number) : Observable<Ride>{
  //   return this.http.get<Ride>(this.url + `riderequest/driver/accept/${id}`)
  // }

  deleteRideReq(id : number) : Observable<string> {
    return this.http.delete<string>(this.url + `riderequests/${id}`,{responseType : 'text' as 'json'})
  }

  updateRideInRideRequest(rideReqId : number,data : RideIdRequest){
    return this.http.patch<RideRequestResponse>(this.url + `riderequests/${rideReqId}/rides`,data);
  }

  updateBookingStatusInRideReq(rideReqId : number,data : any){
    return this.http.patch<RideRequestResponse>(this.url + `riderequests/${rideReqId}/booking-status`,data);
  }

  ngOnDestroy(): void {
    this.checkStatusSubscription?.unsubscribe()
  }
}
