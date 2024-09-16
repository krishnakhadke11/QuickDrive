import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RideRequestResponse } from '../../../../core/models/RideRequestResponse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ride-confirmation-dialog',
  standalone: true,
  imports: [MatCardModule,MatIconModule,MatDialogModule,MatButtonModule,CommonModule],
  templateUrl: './ride-confirmation-dialog.component.html',
  styleUrl: './ride-confirmation-dialog.component.css'
})
export class RideConfirmationDialogComponent implements OnInit{
  readonly data : any = inject<RideRequestResponse>(MAT_DIALOG_DATA);
  readonly rideRequestData : RideRequestResponse | null;

  constructor(){
    this.rideRequestData = this.data.rideRequestData;
  }
  ngOnInit(): void {
  }
}
