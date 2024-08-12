import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, take, tap } from 'rxjs';
import { UserProfile } from '../models/UserProfile';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { AuthenticationService } from '../../features/authentication/services/authentication.service';
import { Role } from '../models/Role';
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
      console.log(res)
      if(res?.role === "CUSTOMER"){
        this.customerSubscription =  this.getCustomerDetails().subscribe((customer) =>{
          console.log(customer)
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
    return this.http.get<Customer>(environment.BASE_URL + 'customer/details')
  }

  getDriverDetails() : Observable<Driver>{
    return this.http.get<Driver>(environment.BASE_URL + 'driver/details')
  }

  updateCustomer(customerData : Customer) {
    return this.http.put<Customer>(environment.BASE_URL + 'customer',customerData).pipe(tap((res : Customer) =>{
      this.userCustomer.next(res);
    }));
  }

  ngOnDestroy(): void {
      this.authUserSubscription?.unsubscribe();
      this.customerSubscription?.unsubscribe();
      this.driverSubscription?.unsubscribe();
  }

}
