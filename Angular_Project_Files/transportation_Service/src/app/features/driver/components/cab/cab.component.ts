import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddcabDialogComponent } from '../addcab-dialog/addcab-dialog.component';
import { FormGroup } from '@angular/forms';
import { Cab } from '../../../../core/models/Cab';
import { CabService } from '../../services/cab.service';
import { UserService } from '../../../../core/services/user.service';
import { Driver } from '../../../../core/models/Driver';
import { Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CurrencyPipe } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DriverService } from '../../services/driver.service';

@Component({
  selector: 'app-cab',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,MatPaginatorModule,MatPaginator,CurrencyPipe,MatTableModule,MatSortModule],
  templateUrl: './cab.component.html',
  styleUrl: './cab.component.css'
})
export class CabComponent implements OnInit,AfterViewInit, OnDestroy {
  readonly dialog = inject(MatDialog);
  UserSubscription : Subscription | null = null;
  CabSubscription : Subscription | null = null;
  cabs : Cab[] = []
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['srNo', 'registerNo', 'seatingCapacity', 'color', 'model'];
  dataSource = new MatTableDataSource<Cab>();

  constructor(private cabService : CabService,private driverService : DriverService,private userService : UserService){

  }
  
  ngOnInit(): void {
    this.userService.getUserDetails();
    this.getAllCabs();
  }
  
  ngAfterViewInit(): void {
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator;
  }
  onAddCab(){
    const dialogRef = this.dialog.open(AddcabDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result instanceof FormGroup){
        this.addCabAction(result);
        result.reset()
      }
    });
  }

  addCabAction(form : FormGroup){
    this.UserSubscription = this.userService.userDriver.subscribe((res : Driver | null) =>{
      const newCab: Cab = {
        registerNo: form.value.registerNo,
        seatingCapacity: form.value.seatingCapacity,
        color: form.value.color,
        model: form.value.model,
        user : {
          id : res?.user?.id
        }
      };
      this.CabSubscription = this.cabService.addCab(newCab).subscribe((res : Cab) =>{
        this.cabs.push(res);
        this.dataSource.data = this.cabs;
      })
    })
  }

  getAllCabs(){
    this.driverService.driverOwnedCabs().subscribe((res : Cab[]) =>{
      if(res){
        this.cabs = res;
        this.dataSource.data = this.cabs;
      }
    })
  }
  ngOnDestroy(): void {
      this.UserSubscription?.unsubscribe()
      this.CabSubscription?.unsubscribe()
  }
}
