import { Component, OnDestroy, OnInit } from '@angular/core';
import { RideRequestService } from '../../../../core/services/ride-request.service';
import { Subscription,  } from 'rxjs';
import { RidereqCardComponent } from '../ridereq-card/ridereq-card.component';
import { CommonModule } from '@angular/common';
import { DriverOpsRes } from '../../../../core/models/DriverOpsRes';
import { DriverOpsService } from '../../services/driver-ops.service';
import { Ride } from '../../../../core/models/Ride';
import { DriverService } from '../../services/driver.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { MapRouteComponent } from '../../../../shared/components/map-route/map-route.component';
import { LatLng } from '../../../../core/models/LatLng';
import { MapboxService } from '../../../../core/services/mapbox.service';
import { RideRequestResponse } from '../../../../core/models/RideRequestResponse';


@Component({
  selector: 'app-riderequest',
  standalone: true,
  imports: [RidereqCardComponent,CommonModule,MapRouteComponent],
  templateUrl: './riderequest.component.html',
  styleUrl: './riderequest.component.css'
})
export class RideRequestComponent implements OnInit,OnDestroy{
  rideRequests : RideRequestResponse[] = [];  
  driverOps : DriverOpsRes | null = null;
  isHired : boolean = false; 
  hiredRide : Ride | null = null;
  message : string = 'No Ride Requests Found'
  rideReqSubscription : Subscription | null = null;
  driverOpsSubscription : Subscription | null = null;
  latestRideSubscription : Subscription | null = null;

  constructor(private rideReqService : RideRequestService,private driverOpsService : DriverOpsService,private driverService : DriverService,private notif : NotificationService,private mapboxService : MapboxService){

  }

  ngOnInit(): void {
    this.checkIfOps();
    this.getAllRideReq(); 
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
      }
    })
  }

  getAllRideReq(){
    this.rideReqSubscription = this.rideReqService.getAllRideRequestsAsPerDriverOps().subscribe((res : RideRequestResponse[])=>{
      this.rideRequests = res;
    })
  }

  driverStatusChange(data : {ride : Ride,isHired : boolean}){
    this.isHired = data.isHired;
    this.hiredRide = data.ride;
  }

  ngOnDestroy(): void {
      this.rideReqSubscription?.unsubscribe();
      this.driverOpsSubscription?.unsubscribe();
      this.latestRideSubscription?.unsubscribe();
  }

}
