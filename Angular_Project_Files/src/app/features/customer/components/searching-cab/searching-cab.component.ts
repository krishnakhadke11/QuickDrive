import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { RideRequestService } from '../../../../core/services/ride-request.service';
import { CommonModule } from '@angular/common';

import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RideConfirmationDialogComponent } from '../ride-confirmation-dialog/ride-confirmation-dialog.component';
import { RideRequestResponse } from '../../../../core/models/RideRequestResponse';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-searching-cab',
  standalone: true,
  imports: [LoaderComponent, CommonModule, MatDialogModule],
  templateUrl: './searching-cab.component.html',
  styleUrl: './searching-cab.component.css',
})
export class SearchingCabComponent implements OnInit, OnDestroy {
  private intervalVar: any;
  private timeoutVar: any;
  private isAccepted : boolean = false;
  private rideRequestSubscription: Subscription | null = null;
  private deleteRideReqSubscription: Subscription | null = null;

  rideReq: RideRequestResponse | null = null;
  isSearching: boolean = true;
  rideRequestResponseData: RideRequestResponse | null = null;

  readonly dialog = inject(MatDialog);
  dialogRef: any;

  constructor(
    private rideReqService: RideRequestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Received From Fare-Card
    this.rideReq = history.state.rideRequest;
    if (this.rideReq) {
      this.startPolling();
    } else {
      this.router.navigate(['/customer']);
      throw Error('Something went wrong');
    }
  }

  startPolling(): void {
    this.intervalVar = setInterval(() => {
      this.rideRequestSubscription = this.rideReqService
        .getRideRequest(this.rideReq?.id!)
        .subscribe((res: RideRequestResponse) => {
          this.rideRequestResponseData = res ? res : null;

          if (res.bookingStatus == 'ACCEPTED') {
            this.isSearching = false;
            this.dialogRef = this.dialog.open(RideConfirmationDialogComponent, {
              data: { rideRequestData: this.rideRequestResponseData },
            });
            this.dialogAfterCloseAction()
            this.stopPolling()
            this.isAccepted  = true;
          }
        });
    }, 5000);

    this.timeoutVar = setTimeout(() => {
      this.dialogRef = this.dialog.open(RideConfirmationDialogComponent, {
        data: { rideRequestData: null },
      });
      this.isSearching = false;
      this.dialogAfterCloseAction()
      this.isAccepted = false;
      this.stopPolling();
    }, 120000);
  }

  dialogAfterCloseAction(): void {
    this.dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/customer/rides']);
    });
  }

  stopPolling(): void {
    if (this.intervalVar) {
      clearInterval(this.intervalVar);
    }
    if (this.timeoutVar) {
      clearTimeout(this.timeoutVar);
    }
    if (this.rideRequestSubscription) {
      this.rideRequestSubscription.unsubscribe();
    }
  }

  deleteRideReq() {
    this.rideReqService.deleteRideReq(this.rideReq?.id!).subscribe((res)=>{

    })
  }

  ngOnDestroy(): void {
    this.stopPolling();
    if(!this.isAccepted){
      this.deleteRideReq()
    } 

    if(this.deleteRideReqSubscription){
      this.deleteRideReqSubscription.unsubscribe()
    }
  }
}
