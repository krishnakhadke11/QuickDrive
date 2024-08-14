import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PaymentService } from '../../services/payment.service';
import { Payment } from '../../../../core/models/Payment';

export interface flattenPayment {
  id?:number;
  paymentType: string;
  paymentStatus: string;
  pickupName: string;
  dropName: string;
  fare?: number;
}

const PAYMENT_DATA: flattenPayment[] = [
  { pickupName: 'Kharghar', dropName: 'Parel', paymentType: 'CASH', paymentStatus: 'PENDING', fare: 700 },
  { pickupName: 'Dadar', dropName: 'Andheri', paymentType: 'ONLINE', paymentStatus: 'Paid', fare: 200 },
  { pickupName: 'Prabhadevi', dropName: 'Bandra', paymentType: 'CASH', paymentStatus: 'Paid', fare: 300 },
  { pickupName: 'Lonavala', dropName: 'Pune', paymentType: 'CASH', paymentStatus: 'Paid', fare: 900 },
];

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [MatTableModule,MatButtonModule,MatPaginatorModule,MatSortModule,CurrencyPipe,MatCardModule,CommonModule],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit  {
  displayedColumns: string[] = ['srNo', 'pickup', 'dropoff', 'paymentType', 'paymentStatus', 'fare'];
  
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<flattenPayment>();

  constructor(private paymentService : PaymentService) { }

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(){
    this.paymentService.getAllPayments().subscribe((data : Payment[]) =>{
      if(data){

        const flattenedData : flattenPayment[] = data.map(payment => ({
          id : payment.id,
          paymentType : payment.paymentType,
          paymentStatus : payment.paymentStatus,
          pickupName: payment.ride.pickupName,
          dropName: payment.ride.dropName,
          fare: payment.ride.fare
        }));

        console.log(flattenedData)

        this.dataSource.data = flattenedData;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }

  // loadPayments(){
  //   this.paymentService.getAllPayments().subscribe((data: Payment[]) => {
  //     if (data) {
  //       // Flatten the data if needed
  //       const flattenedData = data.map(payment => ({
  //         ...payment,
  //         pickup: payment.ride.pickupName,
  //         dropoff: payment.ride.dropName,
  //         fare: payment.ride.fare
  //       }));
  //       this.dataSource.data = flattenedData;
  //       this.dataSource.sort = this.sort;
  //       this.dataSource.paginator = this.paginator;
  //     }
  //   });
  // }
}
