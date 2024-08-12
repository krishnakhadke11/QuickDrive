import { Component, inject, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Ride } from '../../../../core/models/Ride';
import { Address, MapboxService } from '../../../../core/services/mapbox.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { RideDetailsDialogComponent } from '../ride-details-dialog/ride-details-dialog.component';

@Component({
  selector: 'app-ride-card',
  standalone: true,
  imports: [MatCardModule,MatIconModule],
  templateUrl: './ride-card.component.html',
  styleUrl: './ride-card.component.css'
})
export class RideCardComponent implements OnInit{
  @Input() ride : Ride | undefined;
  mapBoxSubscription1 : Subscription | null = null;
  mapBoxSubscription2 : Subscription | null = null;
  // pickupName : string = '-- Pickup Location --'
  // dropLocation : string = '-- Drop Location --';

  readonly dialog = inject(MatDialog);
  dialogRef: any;

  constructor(private mapboxService : MapboxService) { }
  ngOnInit(): void {
    // this.mapBoxSubscription1 = this.mapboxService.searchAddress(this.ride?.pickupLocation).subscribe((res : Address) =>{
    //   // console.log("pickup res : ",res)
    //   if(res){
    //     this.pickupLocation = res.name;
    //   }
    // })
    // console.log("Drop location : ",this.ride?.dropLocation)
    // this.mapBoxSubscription2 = this.mapboxService.searchAddress(this.ride?.dropLocation).subscribe((res : Address) =>{
    //   if(res){
    //     this.dropLocation = res.name;
    //   }
    // })
  }

  onCardClick(){
    // const rideCopy = {...this.ride};
    // rideCopy.pickupLocation = this.pickupLocation;
    // rideCopy.dropLocation = this.dropLocation;
    
    this.dialogRef = this.dialog.open(RideDetailsDialogComponent, {
      data: { rideData: this.ride },
    });
  }
  
}
