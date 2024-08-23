import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DriverOps } from '../../../core/models/DriverOpsReq';
import { environment } from '../../../../environments/environment';
import { DriverOpsRes } from '../../../core/models/DriverOpsRes';
import { catchError, EMPTY, map, Observable, of, throwError } from 'rxjs';
import { OperationalResponse } from '../../../core/models/OperationalResponse';
import { NotificationService } from '../../../core/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class DriverOpsService {
  url = environment.BASE_URL;
  constructor(private http: HttpClient, private notif: NotificationService) {}

  addDriverOps(data: DriverOps): Observable<DriverOpsRes> {
    return this.http.post<DriverOpsRes>(this.url + 'driveroperation', data);
  }

  checkIfOperational(): Observable<{
    data?: DriverOpsRes;
    error?: { status: number; message: string };
  }> {
    return this.http.get<DriverOpsRes>(this.url + 'driver/driveroperation').pipe(
      map((data: DriverOpsRes) => ({ data })),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return of({
            error: {
              status: error.status,
              message: error.message,
            },
          });
        } else {
          return throwError(() => error);
        }
      })
    );
  }

  removeDriverOps(id: number): Observable<string> {
    return this.http.delete<string>(this.url + `driveroperation/${id}`, {
      responseType: 'text' as 'json',
    });
  }
}
