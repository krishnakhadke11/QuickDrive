import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { catchError, exhaustMap, Observable, switchMap, take, throwError } from "rxjs";
import { AuthenticationService } from "../../features/authentication/services/authentication.service";
import { inject } from "@angular/core";
import { environment } from "../../../environments/environment";
import { User } from "../models/User";


export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthenticationService);
  const localUser = localStorage.getItem('user')
  const user = localUser ? JSON.parse(localUser) : null

  if (req.url.startsWith(environment.BASE_URL) && user) {

    if (req.url !== `${environment.BASE_URL}auth/refresh-token`) {
      req = addToken(req);
    }

    return next(req).pipe(catchError((error) => {
      if (error.status === 403 && req.url !== `${environment.BASE_URL}auth/refresh-token`) {
        return handleTokenExpired(req, next, authService);
      }

      return throwError(() => error);
    }))
  } else {
    return next(req)
  }
};

export const addToken = (req: HttpRequest<unknown>) => {
  const localUser = localStorage.getItem('user')
  const user = localUser ? JSON.parse(localUser) : null

  return req.clone({
    setHeaders: {
      Authorization: "Bearer " + user._token,
    }
  });
}

function handleTokenExpired(request: any, next: HttpHandlerFn, authService: AuthenticationService): Observable<HttpEvent<unknown>> {
  const localUser = localStorage.getItem('user')
  const user = localUser ? JSON.parse(localUser) : null

  return authService.refreshAccessToken().pipe(
    switchMap(() => {
      /* Retry the original request with the new access token */
      return next(addToken(request));
    })
  );
}
