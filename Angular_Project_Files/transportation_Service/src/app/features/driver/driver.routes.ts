import { Route } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { CabComponent } from "./components/cab/cab.component";
import { OperationalComponent } from "./components/operational/operational.component";
import { RideRequestComponent } from "./components/riderequest/riderequest.component";
import { EndRideComponent } from "./components/end-ride/end-ride.component";


export const DRIVER_ROUTES : Route[] = [
    {
        path : '',
        component : HomeComponent
    },
    {
        path : 'cab',
        component : CabComponent
    },
    {
        path : 'operational',
        component : OperationalComponent
    },
    {
        path : 'riderequest',
        component : RideRequestComponent
    },
    {
        path : 'end-ride',
        component : EndRideComponent
    },
]