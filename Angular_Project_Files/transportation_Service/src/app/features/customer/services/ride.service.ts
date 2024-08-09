import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ride } from '../../../core/models/Ride';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RideService {

  constructor(private http : HttpClient) { }

  getAllRides() : Observable<Ride[]> { 
    return this.http.get<Ride[]>(environment.BASE_URL + 'ride');
  }
}
