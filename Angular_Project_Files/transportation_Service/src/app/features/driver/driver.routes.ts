import { Route } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { CabComponent } from "./components/cab/cab.component";
import { OperationalComponent } from "./components/operational/operational.component";
import { RideRequestComponent } from "./components/riderequest/riderequest.component";
import { EndRideComponent } from "./components/end-ride/end-ride.component";
import { ProfileComponent } from "../../shared/components/profile/profile.component";
import { TestComponent } from "../../shared/components/test/test.component";
import { canDeactivateGuard, DriverCanActivateGuard } from "../../core/guards/auth.guard";


export const DRIVER_ROUTES : Route[] = [
    {
        path : '',
        component : HomeComponent,
        canActivate : [DriverCanActivateGuard]
    },
    {
        path : 'cab',
        component : CabComponent,
        canActivate : [DriverCanActivateGuard]
    },
    {
        path : 'operation',
        component : OperationalComponent,
        canActivate : [DriverCanActivateGuard]
    },
    {
        path : 'riderequest',
        component : RideRequestComponent,
        canActivate : [DriverCanActivateGuard]
    },
    {
        path : 'end-ride',
        component : EndRideComponent,
        canActivate : [DriverCanActivateGuard]
    },
    {
        path : 'profile',
        component : ProfileComponent,
        canActivate : [DriverCanActivateGuard],
        canDeactivate : [canDeactivateGuard]
    },
    {
        path : 'test',
        component : TestComponent,
        canActivate : [DriverCanActivateGuard]
    },
]