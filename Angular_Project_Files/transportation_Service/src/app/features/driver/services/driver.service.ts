import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ride } from '../../../core/models/Ride';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  url = environment.BASE_URL;
  constructor(private http : HttpClient) { }

  getLatestRideOfDriver() : Observable<Ride>{
    return this.http.get<Ride>(this.url + 'driver/ride/latest')
  }

  endRide(rideId : number) :Observable<string>{
    return this.http.get<string>(this.url + `driver/end/ride/${rideId}`,{responseType : 'text' as 'json'})
  }
}
