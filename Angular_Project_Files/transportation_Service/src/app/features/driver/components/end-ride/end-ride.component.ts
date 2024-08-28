import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EndRide } from '../../../../core/models/EndRide';
import { DriverService } from '../../services/driver.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Payment } from '../../../../core/models/Payment';
import { RideService } from '../../../../core/services/ride.service';
import { PaymentService } from '../../services/payment.service';
import { DriverOpsService } from '../../services/driver-ops.service';
import { DriverOpsRes } from '../../../../core/models/DriverOpsRes';
import { forkJoin, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-end-ride',
  standalone: true,
  imports: [CommonModule,CurrencyPipe,MatButtonModule],
  templateUrl: './end-ride.component.html',
  styleUrl: './end-ride.component.css'
})
export class EndRideComponent implements OnInit{
  endRideData : EndRide | null = null;
  payment : Payment | null = null;
  driverOps : DriverOpsRes | null = null;

  statusSubs : Subscription | null = null;
  driverOpsSubs : Subscription | null = null;
  paymentSubs : Subscription | null = null;

  constructor(private driverOpsService : DriverOpsService,private paymentService : PaymentService,private rideService : RideService,private notif : NotificationService,private router : Router){ }

  ngOnInit(): void {
      this.endRideData = history.state.endRideData

      if(!this.endRideData){
        this.router.navigate(['/driver/riderequest']);
      }else{
        this.checkIfOperational();
        this.getPaymentByRideId();
      }
  }

  checkIfOperational() {
    this.driverOpsSubs =  this.driverOpsService.checkIfOperational().subscribe((res) => {
      if(res.data){
        this.driverOps = res.data;
      }
    })
  }

  getPaymentByRideId() {
    this.paymentSubs = this.rideService.getPaymentByRideId(this.endRideData?.rideId!).subscribe((res : Payment) => {
      this.payment = res;
    });
  }

  endRide() {

    this.statusSubs = forkJoin({
      paymentStatus : this.updatePaymentStatus(),
      driverOpsStatus : this.updateDriverOpsStatus()
    }).subscribe((res) =>{
      if(res.paymentStatus && res.driverOpsStatus){
        this.notif.showSuccess("Ride has been ended successfully");
        this.router.navigate(['/driver/riderequest'])
      }
    })
    
  }

  updatePaymentStatus() : Observable<Payment> {
    const updatePaymentStatus : any = {
      paymentStatus : 'PAID'
    }
    return this.paymentService.updatePaymentStatus(this.payment?.id!,updatePaymentStatus)
  }

  updateDriverOpsStatus() : Observable<DriverOpsRes> {
    const updateStatus : any = {
      status : "AVAILABLE"
    }
    return this.driverOpsService.updateStatus(this.driverOps?.id!,updateStatus);
  }

  ngOnDestroy(): void {
    this.statusSubs?.unsubscribe()
    this.driverOpsSubs?.unsubscribe()
    this.paymentSubs?.unsubscribe()
  }
}
