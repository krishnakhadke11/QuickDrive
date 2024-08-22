import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, CanDeactivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticationService } from "../../features/authentication/services/authentication.service";
import { Observable } from "rxjs";

export const DriverCanActivateGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const router = inject(Router);
    const authService = inject(AuthenticationService);
    const localUser = localStorage.getItem('user') 
    const user = localUser ? JSON.parse(localUser) : null;
    
    if(!user){
        router.navigate(['/login'])
        return false;
    }else if(user && authService.decryptData(user._role) === 'DRIVER'){
        return true;
    }else{
        router.navigate(['/unauthorized']);
        return false;
    }
};

export const CustomerCanActivateGuard: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
) => {
    const router = inject(Router);
    const localUser = localStorage.getItem('user') 
    const user = localUser ? JSON.parse(localUser) : null;
    const authService = inject(AuthenticationService);
    if(!user){
        router.navigate(['/login'])
        return false;
    }else if(user && authService.decryptData(user._role)=== 'CUSTOMER'){
        return true;
    }else{
        router.navigate(['/unauthorized']);
        return false;
    }
};

export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const canDeactivateGuard: CanDeactivateFn<CanComponentDeactivate> = (
    component: CanComponentDeactivate
) => {
        return component.canDeactivate()
    }