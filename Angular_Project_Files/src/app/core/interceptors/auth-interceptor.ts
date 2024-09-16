import { HttpEvent, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { catchError, exhaustMap, Observable, switchMap, take, throwError } from "rxjs";
import { AuthenticationService } from "../../features/authentication/services/authentication.service";
import { inject } from "@angular/core";
import { environment } from "../../../environments/environment";
import { User } from "../models/User";


export const AuthInterceptor: HttpInterceptorFn = (req : HttpRequest<unknown>, next : HttpHandlerFn) => {
  const authService = inject(AuthenticationService);
  const localUser = localStorage.getItem('user')
  const user = localUser ? JSON.parse(localUser) : null

  if(req.url.startsWith(environment.BASE_URL) && user){
    let authReq = addToken(req)

    /* for refresh tokens */
    if(req.url === `${environment.BASE_URL}auth/refresh-token`){
      authReq = req;
    }

    return next(authReq).pipe(catchError((error) => {
      if (error.status === 403 ) {
        return handleTokenExpired(req, next,authService);
      }

      return throwError( () => error);
    }))
  }else{
    return next(req)
  }
};

export const addToken = (req : HttpRequest<unknown>) => {
  const localUser = localStorage.getItem('user')
  const user = localUser ? JSON.parse(localUser) : null

  return req.clone({
    setHeaders: {
      Authorization: "Bearer "+user._token,
    }
   });
}

function handleTokenExpired(request: any, next: HttpHandlerFn, authService : AuthenticationService): Observable<HttpEvent<unknown>> {
  const localUser = localStorage.getItem('user')
  const user = localUser ? JSON.parse(localUser) : null

  return authService.refreshAccessToken().pipe(
    switchMap(() => {
      /* Retry the original request with the new access token */
      return next(addToken(request));
    }),
    catchError((error) => {
      /* Handle refresh token error (e.g., redirect to login page) */
      console.error('Error handling expired access token:', error);
      return throwError(() => error);
    })
  );
}
