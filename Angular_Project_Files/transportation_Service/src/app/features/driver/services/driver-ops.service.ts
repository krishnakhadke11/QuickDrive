import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DriverOps } from '../../../core/models/DriverOpsReq';
import { environment } from '../../../../environments/environment';
import { DriverOpsRes } from '../../../core/models/DriverOpsRes';
import { Observable, of } from 'rxjs';
import { OperationalResponse } from '../../../core/models/OperationalResponse';

@Injectable({
  providedIn: 'root'
})
export class DriverOpsService {
  url = environment.BASE_URL;
  constructor(private http : HttpClient) { }

  addDriverOps(data : DriverOps) : Observable<DriverOpsRes>{
    return this.http.post<DriverOpsRes>(this.url + 'driveroperation',data);
  }

  checkIfOperational() : Observable<DriverOpsRes> {
    return this.http.get<DriverOpsRes>(this.url + 'driveroperation/check');
  }

  removeDriverOps(id : number):Observable<string>{

    return this.http.delete<string>(this.url+`driveroperation/${id}`,{responseType : 'text' as 'json'})
 
  }
}
