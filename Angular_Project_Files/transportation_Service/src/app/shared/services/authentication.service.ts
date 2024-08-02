import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { User } from '../models/User';
import { AuthResponse } from '../models/AuthResponse';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  base_url : string = "http://localhost:8080/"
  constructor(private http : HttpClient,private router : Router,private notif : NotificationService) {

   }

  customerSignup (data : any){
    return this.http.post('http://localhost:8080/auth/customer/signup',data).pipe(catchError(err =>{
      if(err.status === 400){
        return throwError(()=> "Invalid Credentials")
      }else
        return throwError(() => err)
    }),tap((res)=>{
      console.log(res)
      this.notif.showSuccess("Signup Successfull")
      this.router.navigate(['/login'])
    }))
  }

  customerLogin(data : any){
    
    return this.http.post<AuthResponse>('http://localhost:8080/auth/signin',data).pipe(catchError(err =>{
      if(err.status === 400){
        return throwError(()=> "Invalid Credentials")
      }else
        return throwError(() => err)
    }),tap((res)=>{
      console.log("tap")
    
      const user = new User(
        res.token,
        res.refreshToken
      ) 
      this.notif.showSuccess("Login Successfull")
      localStorage.setItem('user',JSON.stringify(user))
      console.log("From Authentication Service : Login Successfull")
      // this.router.navigate(['/customer'])
    }))
    console.log(data)
  }
}
