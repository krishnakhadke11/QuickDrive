import { Route } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { FareSummaryComponent } from "./components/fare-summary/fare-summary.component";
import { RideComponent } from "./components/ride/ride.component";
import { canActivateGuard } from "../../core/guards/auth.guard";


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

]