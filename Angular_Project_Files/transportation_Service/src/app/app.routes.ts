import { Routes } from '@angular/router';
import { LandingPageComponent } from './shared/components/landing-page/landing-page.component';
import { LoginComponent } from './features/authentication/components/login/login.component';
import { SignupComponent } from './features/authentication/components/signup/signup.component';
import { TestComponent } from './shared/components/test/test.component';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { StarRatingComponent } from './shared/components/star-rating/star-rating.component';


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
        path : 'test',
        component : TestComponent
    },
    {
        path : 'star',
        component : StarRatingComponent
    },
    {
        path : 'unauthorized',
        component : UnauthorizedComponent
    },
    {
        path: 'customer',
        loadChildren: () =>
          import('./features/customer/customer.routes').then((mod) => mod.CUSTOMER_ROUTES),
    },
    {
        path: 'driver',
        loadChildren: () =>
          import('./features/driver/driver.routes').then((mod) => mod.DRIVER_ROUTES),
    },
];
