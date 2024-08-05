import { HttpInterceptorFn } from "@angular/common/http";
import { exhaustMap, take } from "rxjs";
import { AuthenticationService } from "../../features/authentication/services/authentication.service";
import { inject } from "@angular/core";


export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  
  const authService = inject(AuthenticationService);
  return authService.user.pipe(take(1), exhaustMap(user => {
            if(!user){
                return next(req);
            }

            if(req.url.startsWith('https://api.mapbox.com')){
              return next(req);
            }
            
            const authReq = req.clone({
              setHeaders: {
                Authorization: user.token,
              }
             });
            return next(authReq)
        }));
};