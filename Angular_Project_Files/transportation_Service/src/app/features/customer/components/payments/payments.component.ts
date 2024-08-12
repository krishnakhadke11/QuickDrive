import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PaymentService } from '../../services/payment.service';
import { Payment } from '../../../../core/models/Payment';

export interface Payments {
  pickup: string;
  dropoff: string;
  paymentType: string;
  paymentStatus: string;
  fare: number;
}

const PAYMENT_DATA: Payments[] = [
  { pickup: 'Kharghar', dropoff: 'Parel', paymentType: 'CASH', paymentStatus: 'PENDING', fare: 700 },
  { pickup: 'Dadar', dropoff: 'Andheri', paymentType: 'ONLINE', paymentStatus: 'Paid', fare: 200 },
  { pickup: 'Prabhadevi', dropoff: 'Bandra', paymentType: 'CASH', paymentStatus: 'Paid', fare: 300 },
  { pickup: 'Lonavala', dropoff: 'Pune', paymentType: 'CASH', paymentStatus: 'Paid', fare: 900 },
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
  @ViewChild(MatPaginatorModule) paginator!: MatPaginator;
  dataSource = new MatTableDataSource<Payment>();

  constructor(private paymentService : PaymentService) { }

  ngOnInit(): void {
    this.loadPayments();
  }

  loadPayments(){
    this.paymentService.getAllPayments().subscribe((data : Payment[]) =>{
      if(data){
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    })
  }
}
