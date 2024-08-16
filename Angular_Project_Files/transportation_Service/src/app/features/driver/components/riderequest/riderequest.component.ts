import { Component, OnDestroy, OnInit } from '@angular/core';
import { RideRequest } from '../../../../core/models/RideRequest';
import { RideRequestService } from '../../../../core/services/ride-request.service';
import { Subscription } from 'rxjs';
import { RidereqCardComponent } from '../ridereq-card/ridereq-card.component';
import { CommonModule } from '@angular/common';
import { DriverOpsRes } from '../../../../core/models/DriverOpsRes';
import { DriverOpsService } from '../../services/driver-ops.service';
import { Ride } from '../../../../core/models/Ride';
import { DriverService } from '../../services/driver.service';

@Component({
  selector: 'app-riderequest',
  standalone: true,
  imports: [RidereqCardComponent,CommonModule],
  templateUrl: './riderequest.component.html',
  styleUrl: './riderequest.component.css'
})
export class RideRequestComponent implements OnInit,OnDestroy{
  rideRequests : RideRequest[] = [];  
  driverOps : DriverOpsRes | null = null;
  isHired : boolean = false; 
  hiredRide : Ride | null = null;
  rideReqSubscription : Subscription | null = null;
  driverOpsSubscription : Subscription | null = null;
  latestRideSubscription : Subscription | null = null;

  constructor(private rideReqService : RideRequestService,private driverOpsService : DriverOpsService,private driverService : DriverService){

  }

  ngOnInit(): void {
     this.getAllRideReq();

      this.driverOpsSubscription = this.driverOpsService.checkIfOperational().subscribe((res : DriverOpsRes) =>{
        this.driverOps = res;
        if(res.status === 'AVAILABLE'){
          this.isHired = false;
        }else{
          this.isHired = true;
          console.log("inside : ",this.isHired)
          this.getLatestRideIfHired();
        }
      })
    
  }

  getLatestRideIfHired(){
   this.latestRideSubscription = this.driverService.getLatestRideOfDriver().subscribe((res :Ride) => {
      console.log(res);
      console.log(this.isHired)
      if(this.isHired){
        this.hiredRide = res;
      }
    })
  }
  getAllRideReq(){
    this.rideReqSubscription = this.rideReqService.getAllRideRequestsAsPerDriverOps().subscribe((res : RideRequest[])=>{
      console.log(res);
      this.rideRequests = res;
    })
  }
  driverStatusChange(data : {ride : Ride,isHired : boolean}){
    this.isHired = data.isHired;
    this.hiredRide = data.ride;
    console.log(this.hiredRide)
  }
  ngOnDestroy(): void {
      this.rideReqSubscription?.unsubscribe();
      this.driverOpsSubscription?.unsubscribe();
      this.latestRideSubscription?.unsubscribe();
  }

}
