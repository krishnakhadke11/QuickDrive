import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './error.service';
import { LoggingService } from './logging.service';
import { NotificationService } from './notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler{

  constructor(private errorService:ErrorService,private logger:LoggingService,private notifier : NotificationService) {

   }

  handleError(error: any): void {
    let message;
    let stackTrace;

    if (error instanceof HttpErrorResponse) {
        // Server Error
        message = this.errorService.getServerMessage(error);
        stackTrace = this.errorService.getServerStack(error);
        this.notifier.showError(message);
        
    } else {
        // Client Error
        message = this.errorService.getClientMessage(error);
        stackTrace = this.errorService.getClientStack(error);
        this.notifier.showError(message);
    }

    // Always log errors
    this.logger.logError(message, stackTrace);

    console.error(error);
  }
}
