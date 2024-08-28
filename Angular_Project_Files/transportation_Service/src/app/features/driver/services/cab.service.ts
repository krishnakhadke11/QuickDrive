import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cab } from '../../../core/models/Cab';
import { environment } from '../../../../environments/environment';
import { FormGroup } from '@angular/forms';
import { Driver } from '../../../core/models/Driver';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CabService {

  constructor(private http: HttpClient) {}

  addCab(newCab: Cab) {
    return this.http.post<Cab>(environment.BASE_URL + 'cabs', newCab).pipe(catchError(err =>{
      if(err.status === 404){
        return throwError(()=> "User Not Found")
      }else{
        return throwError(()=> "Something Went Wrong")
      }
    }));
  }
}
