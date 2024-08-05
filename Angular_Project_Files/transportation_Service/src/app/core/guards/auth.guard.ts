import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";



export const canActivateGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const router = inject(Router);
    const localUser = localStorage.getItem('user') 
    const user = localUser ? JSON.parse(localUser) : null;
    if(user){
        return true;
    }else{
        router.navigate(['/login'])
        return false;
    }
};
