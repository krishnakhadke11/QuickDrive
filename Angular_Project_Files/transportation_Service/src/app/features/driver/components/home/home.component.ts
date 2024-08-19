import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { Ride } from '../../../../core/models/Ride';
import { MatSort } from '@angular/material/sort';
import { DriverService } from '../../services/driver.service';
import { PaymentType } from '../../../../core/models/PaymentType';
import { MatListModule } from '@angular/material/list';
import { Cab } from '../../../../core/models/Cab';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';


export interface flattenRide {
  id?:number;
  pickupName: string;
  dropName: string;
  fare: number;
  paymentType: PaymentType;
  model: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule,RouterLink,MatPaginatorModule,MatTableModule,MatCardModule,CommonModule,MatIconModule,MatListModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  dataSource = new MatTableDataSource<flattenRide>();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['srNo', 'pickupName', 'dropName', 'fare', 'paymentType','model'];

  driversCab : Cab[] = []

  constructor(private driverService : DriverService){

  }

  ngOnInit(): void {
      this.getRides()
      this.getCabs()
  }

  getRides(){
    this.driverService.getAllRidesOfDriver().subscribe((data : Ride[])=>{
      if(data){
        const flattenedData : flattenRide[] = data.map((ride : Ride) => ({
          id : ride.id,
          pickupName: ride.pickupName,
          dropName: ride.dropName,
          fare: ride.fare!,
          paymentType : ride.paymentType!,
          model : ride.cab?.model!,
        }));

        this.dataSource.data = flattenedData;
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      }
    })
  }

  getCabs(){
    this.driverService.getDriverOwnedCabs().subscribe((res : Cab[]) => {
      if(res){
        this.driversCab = res;
      }
    })
  }
}
