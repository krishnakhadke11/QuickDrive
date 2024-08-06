import { HttpInterceptorFn } from "@angular/common/http";
import { exhaustMap, take } from "rxjs";
import { AuthenticationService } from "../../features/authentication/services/authentication.service";
import { inject } from "@angular/core";
import { environment } from "../../../environments/environment";


export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  
  const authService = inject(AuthenticationService);
  return authService.user.pipe(take(1), exhaustMap(user => {
            if(!user){
                return next(req);
            }
            if(req.url.startsWith(environment.BASE_URL)){
              const authReq = req.clone({
                setHeaders: {
                  Authorization: "Bearer "+user.token,
                }
               });
              return next(authReq)
            }else{
              return next(req);
            }
            
        }));
};