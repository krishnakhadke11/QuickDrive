import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Payment } from '../../../core/models/Payment';
import { Observable } from 'rxjs';
import { PaymentRequest } from '../../../core/models/PaymentRequest';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  url = environment.BASE_URL;
  constructor(private http : HttpClient) { }

  createPayment(paymentRequest : PaymentRequest) : Observable<Payment> {
    return this.http.post<Payment>(this.url + 'payments',paymentRequest)
  }

  updatePaymentStatus(paymentId : number,paymentStatus : any) :Observable<Payment>{
    return this.http.patch<Payment>(this.url + `payments/${paymentId}/payment-status`,paymentStatus)
  }
}
