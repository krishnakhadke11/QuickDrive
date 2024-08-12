import { Injectable } from '@angular/core';
import { Payment } from '../../../core/models/Payment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http : HttpClient) { }

  getAllPayments() : Observable<Payment[]> {
    return this.http.get<Payment[]>(environment.BASE_URL + 'payment/customer');
  }
}
