import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { AuthenticationService } from '../../features/authentication/services/authentication.service';
import { Customer } from '../models/Customer';
import { Driver } from '../models/Driver';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService implements  OnDestroy{
  userCustomer  = new BehaviorSubject<Customer | null>(null);
  userDriver  = new BehaviorSubject<Driver | null>(null);
  authUserSubscription : Subscription | null = null;
  customerSubscription : Subscription | null = null;
  driverSubscription : Subscription | null = null;
  // role : Role | undefined;
  constructor(private http : HttpClient,private notif : NotificationService,private authService : AuthenticationService) {

  }

  getUserDetails(){
    this.authUserSubscription = this.authService.user.subscribe((res) =>{
      if(res?.role === "CUSTOMER"){
        this.customerSubscription =  this.getCustomerDetails().subscribe((customer) =>{
           this.userCustomer.next(customer);
         })
       }else if(res?.role === "DRIVER"){
         this.driverSubscription =  this.getDriverDetails().subscribe((res) =>{
           this.userDriver.next(res);
         })
       }
    })
  }

  getCustomerDetails() : Observable<Customer>{
    return this.http.get<Customer>(environment.BASE_URL + 'customers/details')
  }

  getDriverDetails() : Observable<Driver>{
    return this.http.get<Driver>(environment.BASE_URL + 'drivers/details')
  }

  updateCustomer(customerData : Customer) {
    return this.http.put<Customer>(environment.BASE_URL + 'customers',customerData).pipe(tap((res : Customer) =>{
      this.userCustomer.next(res);
    }));
  }

  updateDriver(driverData : Driver) {
    return this.http.put<Driver>(environment.BASE_URL + 'drivers',driverData).pipe(tap((res : Driver) =>{
      this.userDriver.next(res);
    }));
  }

  ngOnDestroy(): void {
      this.authUserSubscription?.unsubscribe();
      this.customerSubscription?.unsubscribe();
      this.driverSubscription?.unsubscribe();
  }

}
