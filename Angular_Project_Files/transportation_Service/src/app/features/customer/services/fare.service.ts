import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { fare } from '../../../core/models/fareData';
import { catchError, of, throwError } from 'rxjs';
import { NotificationService } from '../../../core/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class FareService {
  baseUrl = environment.BASE_URL;
  constructor(private http: HttpClient) {}

  checkExpense(pickupLocation: string, dropLocation: string) {
    const params = new HttpParams()
    .set('pickupLocation', pickupLocation)
    .set('dropLocation', dropLocation);
    
    return this.http.get<fare>(this.baseUrl + 'fare',{params});
  }
}
