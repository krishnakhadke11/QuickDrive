import { Route } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { FareSummaryComponent } from "./components/fare-summary/fare-summary.component";
import { RideComponent } from "./components/ride/ride.component";
import { canDeactivateGuard, CustomerCanActivateGuard } from "../../core/guards/auth.guard";
import { SearchingCabComponent } from "./components/searching-cab/searching-cab.component";
import { ProfileComponent } from "../../shared/components/profile/profile.component";
import { PaymentsComponent } from "./components/payments/payments.component";


export const CUSTOMER_ROUTES : Route[] = [
    {
        path : '',
        component : HomeComponent,
        canActivate : [CustomerCanActivateGuard]
    },
    {
        path : 'fare',
        component : FareSummaryComponent,
        canActivate : [CustomerCanActivateGuard]
    },
    {
        path : 'rides',
        component : RideComponent,
        canActivate : [CustomerCanActivateGuard]
    },
    {
        path : 'searchingcab',
        component : SearchingCabComponent,
        canActivate : [CustomerCanActivateGuard]
    },
    {
        path : 'profile',
        component : ProfileComponent,
        canActivate : [CustomerCanActivateGuard],
        canDeactivate : [canDeactivateGuard]
    },
    {
        path : 'payments',
        component : PaymentsComponent,
        canActivate : [CustomerCanActivateGuard]
    },
]