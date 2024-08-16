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
import { Subscription } from 'rxjs';
import { EndRide } from '../../../../core/models/EndRide';

@Component({
  selector: 'app-ridereq-card',
  standalone: true,
  imports: [MatCardModule, CurrencyPipe, MatButtonModule, CommonModule],
  templateUrl: './ridereq-card.component.html',
  styleUrl: './ridereq-card.component.css',
})
export class RidereqCardComponent {
  @Input() reqId: number | null = null;
  @Input() pickup: string = '';
  @Input() drop: string = '';
  @Input() fare: number = 0;
  @Input() distance: string = '';
  @Input() duration: string = '';

  @Input() rideId: number | null = null;
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
    private notif: NotificationService
  ) {}

  acceptRequest() {
    console.log('Request accepted');
    if (this.reqId) {
      this.acceptRideSubs =this.rideReqService.acceptRideRequest(this.reqId).subscribe((res: Ride) => {
          console.log(res);
          this.bookedRide = res;
          this.isHired = true;
          this.isHiredChange.emit({
            ride: this.bookedRide,
            isHired: this.isHired,
          });
        });
    }
  }

  onEndReq() {
   const endRideData : EndRide = {
    rideId : this.rideId!,
    pickupName : this.pickup,
    dropName : this.drop,
    fare : this.fare,
    distance : this.distance,
    duration : this.duration,
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
