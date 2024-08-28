import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RideRequestService } from '../../../../core/services/ride-request.service';
import { Ride } from '../../../../core/models/Ride';
import { Customer } from '../../../../core/models/Customer';
import { DriverService } from '../../services/driver.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../core/services/notification.service';
import { Subscription, switchMap } from 'rxjs';
import { EndRide } from '../../../../core/models/EndRide';
import { RideRequestResponse } from '../../../../core/models/RideRequestResponse';
import { DriverOpsRes } from '../../../../core/models/DriverOpsRes';
import { RideService } from '../../../../core/services/ride.service';
import { RideIdRequest } from '../../../../core/models/RideIdRequest';
import { PaymentRequest } from '../../../../core/models/PaymentRequest';
import { PaymentService } from '../../services/payment.service';
import { Payment } from '../../../../core/models/Payment';
import { DriverOpsService } from '../../services/driver-ops.service';
import { RideRequestDto } from '../../../../core/models/RideRequestDto';
import { TestRequest } from '@angular/common/http/testing';

@Component({
  selector: 'app-ridereq-card',
  standalone: true,
  imports: [MatCardModule, CurrencyPipe, MatButtonModule, CommonModule],
  templateUrl: './ridereq-card.component.html',
  styleUrl: './ridereq-card.component.css',
})
export class RidereqCardComponent {
  @Input() driverOps : DriverOpsRes | null = null;
  @Input() rideReq : RideRequestResponse | null = null;

  @Input() ride : Ride | null =  null;
  @Input() customer: Customer | null = null;

  @Output() isHiredChange = new EventEmitter<{
    ride: Ride;
    isHired: boolean;
  }>();

  isHired: boolean = false;
  bookedRide: Ride | null = null;

  acceptRideSubs : Subscription | null = null
  endRideSubs : Subscription | null = null

  constructor(
    private rideReqService: RideRequestService,
    private driverService: DriverService,
    private router: Router,
    private notif: NotificationService,
    private rideService : RideService,
    private paymentService : PaymentService,
    private driverOpsService : DriverOpsService
  ) {}

  acceptRequest() {
    const ride : RideRequestDto = {
      pickupLocation : this.rideReq?.pickupLocation!,
      pickupName : this.rideReq?.pickupName!,
      dropLocation : this.rideReq?.dropLocation!,
      dropName : this.rideReq?.dropName!,
      fare : this.rideReq?.fare!,
      distance : this.rideReq?.distance!,
      duration : this.rideReq?.duration!,
      paymentType : this.rideReq?.paymentType!,
      customer : {
        id : this.rideReq?.customer.id!
      },
      cab : {
        id : this.driverOps?.cab.id!
      },
      driver : {
        id : this.driverOps?.driver.id!,
      }
    }

    console.log("hello",ride)

    this.rideService.createRide(ride).subscribe((res : Ride) => {
      console.log("hello")
      if(res && res.id){
        this.updateRideInRideReq(res.id);
        this.createPayment(res.id);
        this.updateStatusOfDriverOps();

        this.isHired = true
        this.bookedRide = res;
        this.isHiredChange.emit({
          ride: this.bookedRide,
          isHired: this.isHired,
        });
      }
      
    })
  }

  updateStatusOfDriverOps(){
    const updateStatus : any = {
      status : 'HIRED'
    }

    this.driverOpsService.updateStatus(this.driverOps?.id!,updateStatus).subscribe((res : DriverOpsRes) => {
      console.log("Driver Ops Status Update : ",res);
    })
  }

  createPayment(rideId : number) {
   
    const paymentRequest : PaymentRequest = {
      paymentType : this.rideReq?.paymentType!,
      paymentStatus : 'PENDING',
      ride : {
        id : rideId
      } 
    }

    this.paymentService.createPayment(paymentRequest).subscribe((res : Payment) => {
      console.log("Creating Payment : ",res);
    })
  }

  updateRideInRideReq(rideId : number) {
    const rideObj : RideIdRequest = {
      id : rideId
    }
    this.rideReqService.updateRideInRideRequest(this.rideReq?.id!,rideObj).subscribe((res) => {
      this.updateBookingStatusInRideReq();
      console.log("Ride Request While Ride Update : " , res);
    });
  }

  updateBookingStatusInRideReq(){
    const updateBookingStatus : any = {
      bookingStatus : 'ACCEPTED'
    }
    this.rideReqService.updateBookingStatusInRideReq(this.rideReq?.id!,updateBookingStatus).subscribe((res) =>{
      console.log("Ride Request while Booking status : ",res);
    });
  }

  onEndReq() {
   const endRideData : EndRide = {
    rideId : this.ride?.id!,
    pickupName : this.ride?.pickupName!,
    dropName : this.ride?.dropName!,
    fare : this.ride?.fare!,
    distance :  this.ride?.distance!,
    duration : this.ride?.duration!,
    customer : {
      email : this.customer?.user.email!,
      fullname : this.customer?.user.firstName + " " + this.customer?.user.lastName
    }
   }

   this.router.navigate(['/driver/end-ride'],{state : { endRideData : endRideData}});

  }

  ngOnDestroy(): void {
    this.acceptRideSubs?.unsubscribe()
    this.endRideSubs?.unsubscribe()
    
  }
}
