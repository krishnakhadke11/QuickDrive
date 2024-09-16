import { Injectable } from '@angular/core';
import { catchError, EMPTY, Observable, throwError } from 'rxjs';
import { Ride } from '../../../core/models/Ride';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Cab } from '../../../core/models/Cab';
import { EarningResponse } from '../../../core/models/EarningResponse';
import { NotificationService } from '../../../core/services/notification.service';
import { DriverRatingResponse } from '../../../core/models/DriverRatingResponse';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  url = environment.BASE_URL;
  constructor(private http : HttpClient,private notif : NotificationService) { }

  getLatestRideOfDriver() : Observable<Ride[]>{
    const params = new HttpParams()
    .set('sort', 'createdAt')
    .set('order', 'desc')
    .set('limit', '1');
    
    return this.http.get<Ride[]>(this.url + 'drivers/rides', {params})
  }

  getAllRidesOfDriver() : Observable<Ride[]>{
    return this.http.get<Ride[]>(this.url + `drivers/rides`)
  }

  getDriverOwnedCabs() : Observable<Cab[]>{
    return this.http.get<Cab[]>(this.url + 'drivers/cabs')
  }

  // endRide(rideId : number) :Observable<string>{
  //   return this.http.get<string>(this.url + `drivers/end/ride/${rideId}`,{responseType : 'text' as 'json'})
  // }

  driverOwnedCabs() : Observable<Cab[] | []> {
    return this.http.get<Cab[] | []>(environment.BASE_URL + 'drivers/cabs');
  }

  getMonthlyEarnings() : Observable<EarningResponse> {
    return this.http.get<EarningResponse>(this.url + 'drivers/monthly-earnings').pipe(catchError((error : HttpErrorResponse)=>{
      if(error.status === 404){
        this.notif.showSuccess("No Payments Currently")
        return EMPTY;
      }else{
        return throwError(() => error);
      }
    }));
  }

  getAverageRatingOfDriver() : Observable<DriverRatingResponse>{
    return this.http.get<DriverRatingResponse>(this.url + 'drivers/average-rating');
  }
}
