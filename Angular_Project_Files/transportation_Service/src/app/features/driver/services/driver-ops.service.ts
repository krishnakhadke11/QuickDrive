import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DriverOps } from '../../../core/models/DriverOpsReq';
import { environment } from '../../../../environments/environment';
import { DriverOpsRes } from '../../../core/models/DriverOpsRes';
import { catchError, EMPTY, Observable, of, throwError } from 'rxjs';
import { OperationalResponse } from '../../../core/models/OperationalResponse';
import { NotificationService } from '../../../core/services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class DriverOpsService {
  url = environment.BASE_URL;
  constructor(private http : HttpClient,private notif : NotificationService) { }

  addDriverOps(data : DriverOps) : Observable<DriverOpsRes>{
    return this.http.post<DriverOpsRes>(this.url + 'driveroperation',data);
  }

  checkIfOperational() : Observable<DriverOpsRes> {
    return this.http.get<DriverOpsRes>(this.url + 'driveroperation/check').pipe(catchError((error : HttpErrorResponse) =>{
      if(error.status === 404){
        this.notif.showError(error.error.detail)
      }else{
        this.notif.showError("Unexpected Error Occured")
      }
      return EMPTY;
    }));
  }

  removeDriverOps(id : number):Observable<string>{

    return this.http.delete<string>(this.url+`driveroperation/${id}`,{responseType : 'text' as 'json'})
 
  }
}
