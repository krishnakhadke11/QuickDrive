import { Routes } from '@angular/router';
import { LandingPageComponent } from './shared/components/landing-page/landing-page.component';
import { LoginComponent } from './features/authentication/components/login/login.component';
import { SignupComponent } from './features/authentication/components/signup/signup.component';


export const routes: Routes = [
    {
        path : '',
        component : LandingPageComponent
    },
    {
        path : 'login',
        component : LoginComponent
    },
    {
        path : 'signup',
        component : SignupComponent
    },
    {
        path: 'customer',
        loadChildren: () =>
          import('./features/customer/customer.routes').then((mod) => mod.CUSTOMER_ROUTES),
      },
];
