import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Ride } from '../../../../core/models/Ride';
import { StarRatingComponent } from "../../../../shared/components/star-rating/star-rating.component";
import { RideService } from '../../../../core/services/ride.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ride-details-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule, CurrencyPipe, StarRatingComponent],
  templateUrl: './ride-details-dialog.component.html',
  styleUrl: './ride-details-dialog.component.css'
})
export class RideDetailsDialogComponent implements OnDestroy {
  readonly data : any = inject<Ride>(MAT_DIALOG_DATA);
  private dialogRef : any = inject(MatDialogRef<RideDetailsDialogComponent>) 
  rideData : Ride;

  ratingSubs : Subscription | null = null;

  constructor(private rideService : RideService){
    this.rideData = this.data.rideData;
  }
  onRatingUpdate(rating : number){
    this.ratingSubs =  this.rideService.updateRating(this.rideData.id!,rating).subscribe((res : Ride) => {
      this.rideData.rating = res.rating;
    })
  }

  ngOnDestroy(): void {
      this.ratingSubs?.unsubscribe();
  }

}
