import { ApplicationConfig, ErrorHandler, inject, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { GlobalErrorHandler } from './core/services/global-error-handler.service';
import { AuthInterceptor } from './core/interceptors/auth-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    {provide:ErrorHandler , useClass : GlobalErrorHandler},
  ],
};
