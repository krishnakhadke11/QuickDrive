import { Route } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { CabComponent } from "./components/cab/cab.component";
import { OperationalComponent } from "./components/operational/operational.component";


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
]