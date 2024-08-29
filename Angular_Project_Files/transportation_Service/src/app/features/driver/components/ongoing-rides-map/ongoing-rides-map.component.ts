import { Component } from '@angular/core';
import { DriverOpsRes } from '../../../../core/models/DriverOpsRes';
import { Ride } from '../../../../core/models/Ride';
import { LatLng } from '../../../../core/models/LatLng';
import { Subscription } from 'rxjs';
import { DriverOpsService } from '../../services/driver-ops.service';
import { MapboxService } from '../../../../core/services/mapbox.service';
import { DriverService } from '../../services/driver.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { RidereqCardComponent } from '../ridereq-card/ridereq-card.component';
import { CommonModule } from '@angular/common';
import { MapRouteComponent } from '../../../../shared/components/map-route/map-route.component';

@Component({
  selector: 'app-ongoing-rides-map',
  standalone: true,
  imports: [RidereqCardComponent,CommonModule,MapRouteComponent],
  templateUrl: './ongoing-rides-map.component.html',
  styleUrl: './ongoing-rides-map.component.css'
})
export class OngoingRidesMapComponent {
  driverOps : DriverOpsRes | null = null;
  isHired : boolean = false; 
  hiredRide : Ride | null = null;
  latLng : LatLng | null = null;

  driverOpsSubscription : Subscription | null = null;
  latestRideSubscription : Subscription | null = null;


  constructor(private driverOpsService : DriverOpsService,private driverService : DriverService,private notif : NotificationService,private mapboxService : MapboxService){

  }

  ngOnInit(): void {
    this.checkIfOps();
  }

  checkIfOps(){
    this.driverOpsSubscription = this.driverOpsService.checkIfOperational().subscribe({next : (res) =>{
     if(res.data){
        this.driverOps = res.data!;
        if(res.data && res.data.cabStatus === 'AVAILABLE'){
          this.isHired = false;
        }else if(res.data && res.data.cabStatus === 'HIRED'){
          this.isHired = true;
          this.getLatestRideIfHired();
        }
      }
    }})
  }

  getLatestRideIfHired(){
   this.latestRideSubscription = this.driverService.getLatestRideOfDriver().subscribe((res :Ride[]) => {
      if(this.isHired){
        this.hiredRide = res[0];
        this.setCoordinates();
      }
    })
  }

  setCoordinates() {
    if(this.hiredRide){
      this.latLng = this.mapboxService.latLngExtraction(this.hiredRide.pickupLocation!,this.hiredRide.dropLocation!);
    }
  }

  driverStatusChange(data : {ride : Ride,isHired : boolean}){
    this.isHired = data.isHired;
    this.hiredRide = data.ride;
    this.setCoordinates();
  }

}
