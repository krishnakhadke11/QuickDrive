import { CurrencyPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { RideRequestService } from '../../services/ride-request.service';
import { RideRequest } from '../../../../core/models/RideRequest';
import { PaymentType } from '../../../../core/models/PaymentType';
import { SeatingCapacity } from '../../../../core/models/SeatingCapacity';

interface Payment {
  value: string;
  viewValue: string;
}

 

@Component({
  selector: 'app-fare-card',
  standalone: true,
  imports: [MatCardModule,CurrencyPipe,MatFormField,MatInputModule,MatSelectModule,FormsModule],
  templateUrl: './fare-card.component.html',
  styleUrl: './fare-card.component.css'
})
export class FareCardComponent {

  @Input() fareAmount!: number | undefined;
  @Input() distance!: string | undefined;
  @Input() vehicleType!: string | null;
  @Input() dropLocation!: string | undefined;
  @Input() pickupLocation!:string | undefined;
  @Input() duration!:string | undefined;
  @Input() seatingCapacity : SeatingCapacity | undefined;
  @Input() pickupName : string | undefined;
  @Input() dropName : string | undefined;

  // @Input() paymentType!: string | null;

  paymentMode: Payment[] = [
    {value: 'CASH', viewValue: 'Cash'},
    {value: 'ONLINE', viewValue: 'Online'},
  ];

  paymentType : PaymentType = "CASH";
  
  constructor(private rideReqService : RideRequestService,private router:Router){

  }

  onBooking(){
    const rideRequest : RideRequest  = {
        pickupLocation : this.pickupLocation,
        pickupName : this.pickupName,
        dropLocation : this.dropLocation,
        dropName : this.dropName,
        distance : this.distance,
        duration : this.duration,
        fare : this.fareAmount,
        paymentType : this.paymentType,
        seatingCapacity : this.seatingCapacity
    }
   
    this.rideReqService.createRideRequest(rideRequest).subscribe((res)=>{
      console.log(res);
      this.router.navigate(['/customer/searchingcab'],{state : {rideRequest : res}})
    })
    
  }
}
