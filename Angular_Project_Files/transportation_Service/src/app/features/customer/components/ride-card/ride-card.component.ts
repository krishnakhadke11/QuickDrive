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
    
  }

  onCardClick(){
    
    this.dialogRef = this.dialog.open(RideDetailsDialogComponent, {
      data: { rideData: this.ride },
    });
  }
  
}
