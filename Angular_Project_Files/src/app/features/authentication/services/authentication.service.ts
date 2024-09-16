import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { NotificationService } from '../../../core/services/notification.service';
import { AuthResponse } from '../../../core/models/AuthResponse';
import { User } from '../../../core/models/User';
import { Role } from '../../../core/models/Role';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../../environments/environment';
import { DriverRequest } from '../../../core/models/Requests/DriverRequest';
import { CustomerRequest } from '../../../core/models/Requests/CustomerRequest';
import { Driver } from '../../../core/models/Driver';
import { Customer } from '../../../core/models/Customer';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  base_url : string = "http://localhost:8080/"
  user  = new BehaviorSubject<User | null>(null);

  constructor(private http : HttpClient,private router : Router,private notif : NotificationService) {

   }

  customerSignup (data : CustomerRequest) : Observable<Customer>{
    return this.http.post<Customer>(this.base_url + `auth/customers/signup`,data).pipe(catchError(err =>{
      if(err.status === 400){
        return throwError(()=> "Invalid Credentials")
      }else
        return throwError(() => err)
    }),tap((res)=>{
      console.log(res)
      this.notif.showSuccess("Signup Successfull")
    }))
  }

  driverSignup(data : DriverRequest) : Observable<Driver>{
    return this.http.post<Driver>(this.base_url + `auth/drivers/signup`,data).pipe(catchError(err =>{
      if(err.status === 400){
        return throwError(()=> "Please add your right details")
      }else
        return throwError(() => err)
    }),tap((res)=>{
      console.log(res)
      this.notif.showSuccess("Signup Successfull")
    }))
  }

  login(data : any,role : Role){
    
    return this.http.post<AuthResponse>(this.base_url + `auth/signin`,data).pipe(catchError(err =>{
      if(err.status === 400){
        return throwError(()=> "Invalid Credentials")
      }else
        return throwError(() => err)
    }),tap((res)=>{
      console.log("tap",res.role)
    
      const user = new User(
        res.token,
        res.refreshToken,
        res.role
      ) 

      

      this.notif.showSuccess("Login Successfull")
      localStorage.setItem('user',JSON.stringify(new User(res.token,res.refreshToken,this.encryptData(res.role))))
      this.user.next(user);
    }))
  }

  // refreshToken(){
  //   return this.http.post<AuthResponse>(this.base_url + 'auth/refresh-token',{token : this.user.getValue()?.refreshToken})
  // }

  refreshAccessToken(): Observable<AuthResponse> {
    // Call the refresh token endpoint to get a new access token
    return this.http.post<AuthResponse>(this.base_url + `auth/refresh-token`, { token : this.user.getValue()?.refreshToken }).pipe(
      tap((res) => {
        // Update the access token in the local storage
        localStorage.setItem('user', JSON.stringify(new User(res.token,res.refreshToken,this.encryptData(res.role))));
        this.autoLogin();
      }),
      catchError((error) => {
        // Handle refresh token error (e.g., redirect to login page)
        console.error('Error refreshing access token:', error);
        return throwError(() => error);
      })
    );
  }

  logout(){
    this.user.next(null)
    localStorage.removeItem('user');
    this.router.navigate(['/login'])
  }

  autoLogin() { 
    const localUser = localStorage.getItem('user')
    const user = localUser ? JSON.parse(localUser) : null
    if(user){
      const newUserObj = new User(user._token,user._refreshToken,this.decryptData(user._role));
      this.user.next(newUserObj);
      return;
    }else{
      this.router.navigate(['/login'])
    }
    
  }

  encryptData(data: string) : string {
    return CryptoJS.AES.encrypt(data, environment.secretKey).toString();
  }

  decryptData(cipherText: string) : string {
    const bytes = CryptoJS.AES.decrypt(cipherText, environment.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}
