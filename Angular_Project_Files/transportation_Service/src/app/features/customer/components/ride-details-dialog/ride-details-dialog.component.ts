import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Ride } from '../../../../core/models/Ride';

@Component({
  selector: 'app-ride-details-dialog',
  standalone: true,
  imports: [MatDialogModule,MatButtonModule,CommonModule,CurrencyPipe],
  templateUrl: './ride-details-dialog.component.html',
  styleUrl: './ride-details-dialog.component.css'
})
export class RideDetailsDialogComponent {
  readonly data : any = inject<Ride>(MAT_DIALOG_DATA);
  readonly rideData : Ride;

  constructor(){
    this.rideData = this.data.rideData;
  }
}
