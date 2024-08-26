import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { Ride } from '../../../../core/models/Ride';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DriverService } from '../../services/driver.service';
import { PaymentType } from '../../../../core/models/PaymentType';
import { MatListModule } from '@angular/material/list';
import { Cab } from '../../../../core/models/Cab';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CabStatus } from '../../../../core/models/CabStatus';
import { DriverOpsService } from '../../services/driver-ops.service';
import { DriverOpsRes } from '../../../../core/models/DriverOpsRes';
import { NotificationService } from '../../../../core/services/notification.service';
import { DriverStatus } from '../../../../core/models/DriverStatus';
import { Subscription } from 'rxjs';
import { EndRide } from '../../../../core/models/EndRide';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EarningResponse } from '../../../../core/models/EarningResponse';

export interface flattenRide {
  id?: number;
  pickupName: string;
  dropName: string;
  fare: number;
  paymentType: PaymentType;
  model: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    CommonModule,
    MatIconModule,
    MatListModule,
    CommonModule,
    RouterLink,
    MatSortModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  dataSource = new MatTableDataSource<flattenRide>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'srNo',
    'pickupName',
    'dropName',
    'fare',
    'paymentType',
    'model',
  ];

  driversCab: Cab[] = [];
  status: DriverStatus = 'OFFLINE';
  driverOpsSubscription : Subscription | null = null;
  latestRideSubscription : Subscription | null = null;
  driverOps : DriverOpsRes | null = null;
  isHired : boolean = false; 
  hiredRide : Ride | null = null;
  today : Date = new Date();
  earnings : EarningResponse | null = null;

  constructor(
    private driverService: DriverService,
    private driverOpsService: DriverOpsService,
    private notif: NotificationService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.getRides();
    this.getCabs();
    this.driverStatus();
    this.getEarnings();
  }
  
  
  getRides() {
    this.driverService.getAllRidesOfDriver().subscribe((data: Ride[]) => {
      if (data) {
        const flattenedData: flattenRide[] = data.map((ride: Ride,index:number) => ({
          srNo: index+1,
          id: ride.id,
          pickupName: ride.pickupName,
          dropName: ride.dropName,
          fare: ride.fare!,
          paymentType: ride.paymentType!,
          model: ride.cab?.model!,
        }));

        this.dataSource.data = flattenedData;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  getCabs() {
    this.driverService.getDriverOwnedCabs().subscribe((res: Cab[]) => {
      if (res) {
        this.driversCab = res;
      }
    });
  }

  onEndReq() {
    const endRideData : EndRide = {
     rideId : this.hiredRide?.id!,
     pickupName : this.hiredRide?.pickupName!,
     dropName : this.hiredRide?.dropName!,
     fare : this.hiredRide?.fare!,
     distance : this.hiredRide?.distance!,
     duration : this.hiredRide?.duration!,
     customer : {
       email : this.hiredRide?.customer?.user.email!,
       fullname : this.hiredRide?.customer?.user.firstName + " " + this.hiredRide?.customer?.user.lastName
     }
    }

    this.router.navigate(['/driver/end-ride'],{state : { endRideData : endRideData}});
  }

  driverStatus() {
    this.driverOpsService.checkIfOperational().subscribe((res) => {
      if (res.error) {
        if (res.error.status === 404) {
          this.notif.showError('Driver is not operational');
          this.status = 'OFFLINE';
        }
      } else {
        if(res.data){
          this.status = res.data?.status!;
          this.driverOps = res.data!;
          if(res.data && res.data.status === 'AVAILABLE'){
            this.isHired = false;
          }else if(res.data && res.data.status === 'HIRED'){
            this.isHired = true;
            this.getLatestRideIfHired();
          }
        }
      }
    });
  }

  getLatestRideIfHired(){
    this.latestRideSubscription = this.driverService.getLatestRideOfDriver().subscribe((res :Ride) => {
       if(this.isHired){
         this.hiredRide = res;
        }
      })
   }
   getEarnings() {
    this.driverService.getMonthlyEarnings().subscribe((res : EarningResponse) => {
      if(res){
        this.earnings = res;
      }
    })
  }
   
  }
  
