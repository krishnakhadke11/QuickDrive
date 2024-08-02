import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  getClientMessage(error: Error): string {
    if (!navigator.onLine) {
        return 'No Internet Connection';
    }
    return error.message ? error.message : error.toString();
  }

  getClientStack(error: Error): string | undefined{
      return error.stack?.toString();
  }

  getServerMessage(error: HttpErrorResponse): string {
      return error.message;
  }

  getServerStack(error: HttpErrorResponse): string {
      // handle stack trace
      return error.message;
  }
}
