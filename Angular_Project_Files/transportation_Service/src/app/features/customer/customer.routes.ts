import { Route } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { FareSummaryComponent } from "./components/fare-summary/fare-summary.component";
import { RideComponent } from "./components/ride/ride.component";
import { canActivateGuard } from "../../core/guards/auth.guard";
import { SearchingCabComponent } from "./components/searching-cab/searching-cab.component";
import { ProfileComponent } from "./components/profile/profile.component";


export const CUSTOMER_ROUTES : Route[] = [
    {
        path : '',
        component : HomeComponent
    },
    {
        path : 'fare',
        component : FareSummaryComponent,
        canActivate : [canActivateGuard]
    },
    {
        path : 'rides',
        component : RideComponent,
        canActivate : [canActivateGuard]
    },
    {
        path : 'searchingcab',
        component : SearchingCabComponent,
    },
    {
        path : 'profile',
        component : ProfileComponent,
    },
]