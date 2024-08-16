import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { NotificationService } from '../../../core/services/notification.service';
import { AuthResponse } from '../../../core/models/AuthResponse';
import { User } from '../../../core/models/User';
import { Role } from '../../../core/models/Role';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  base_url : string = "http://localhost:8080/"
  user  = new BehaviorSubject<User | null>(null);

  constructor(private http : HttpClient,private router : Router,private notif : NotificationService) {

   }

  customerSignup (data : any){
    return this.http.post(this.base_url + `auth/customer/signup`,data).pipe(catchError(err =>{
      if(err.status === 400){
        return throwError(()=> "Invalid Credentials")
      }else
        return throwError(() => err)
    }),tap((res)=>{
      console.log(res)
      this.notif.showSuccess("Signup Successfull")
    }))
  }

  driverSignup(data : any){
    return this.http.post(this.base_url + `auth/driver/signup`,data).pipe(catchError(err =>{
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
      localStorage.setItem('user',JSON.stringify(user))
      this.user.next(user);
    }))
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
      const newUserObj = new User(user._token,user._refreshToken,user._role);
      this.user.next(newUserObj);
      if(newUserObj.role === 'CUSTOMER'){
        this.router.navigate(['/customer'])
      }else if(newUserObj.role === 'DRIVER'){
        this.router.navigate(['/driver'])
      }else{
        this.router.navigate(['/login'])
      }
      return;
    }
    this.router.navigate(['/login'])
  }

}
