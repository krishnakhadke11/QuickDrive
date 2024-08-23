import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { Ride } from '../../../core/models/Ride';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Cab } from '../../../core/models/Cab';
import { EarningResponse } from '../../../core/models/EarningResponse';
import { NotificationService } from '../../../core/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  url = environment.BASE_URL;
  constructor(private http : HttpClient,private notif : NotificationService) { }

  getLatestRideOfDriver() : Observable<Ride>{
    return this.http.get<Ride>(this.url + 'driver/ride/latest')
  }

  getAllRidesOfDriver() : Observable<Ride[]>{
    return this.http.get<Ride[]>(this.url + `driver/ride`)
  }

  getDriverOwnedCabs() : Observable<Cab[]>{
    return this.http.get<Cab[]>(this.url + 'driver/cabs')
  }

  endRide(rideId : number) :Observable<string>{
    return this.http.get<string>(this.url + `driver/end/ride/${rideId}`,{responseType : 'text' as 'json'})
  }

  getMonthlyEarnings() : Observable<EarningResponse> {
    return this.http.get<EarningResponse>(this.url + 'driver/payment/earnings').pipe(catchError((error : HttpErrorResponse)=>{
      if(error.status === 404){
        this.notif.showSuccess("No Payments Currently")
        return EMPTY;
      }else{
        return throwError(() => error);
      }
    }));
  }
}
