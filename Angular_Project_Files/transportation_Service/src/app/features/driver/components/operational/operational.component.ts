import { Component, OnInit, ViewChild } from '@angular/core';
import { Cab } from '../../../../core/models/Cab';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { DriverOps } from '../../../../core/models/DriverOpsReq';
import { DriverOpsService } from '../../services/driver-ops.service';
import { DriverOpsRes } from '../../../../core/models/DriverOpsRes';
import { Subscription } from 'rxjs';
import { NotificationService } from '../../../../core/services/notification.service';
import { DriverService } from '../../services/driver.service';
import { MatIconModule } from '@angular/material/icon';
import { StarRatingComponent } from '../../../../shared/components/star-rating/star-rating.component';
import { DriverRatingResponse } from '../../../../core/models/DriverRatingResponse';

@Component({
  selector: 'app-operational',
  standalone: true,
  imports: [MatFormFieldModule,ReactiveFormsModule,MatButtonModule,MatInputModule,MatListModule,CommonModule,MatFormFieldModule,FormsModule, MatIconModule, StarRatingComponent],
  templateUrl: './operational.component.html',
  styleUrl: './operational.component.css'
})
export class OperationalComponent implements OnInit{
  driverCabs : Cab[] = []
  cabId = new FormControl(null,[Validators.required])
  isDriverOps : DriverOpsRes | null = null
  driverRating : number = 0;

  driverCabsSubscription : Subscription | null = null
  addDriverOpsSubscription : Subscription | null = null
  checkOperationalSubscription : Subscription | null = null
  driverRatingSubs : Subscription | null = null;

  addDriverOperationalForm = new FormGroup({
    startTime : new FormControl('',[Validators.required]),
    endTime : new FormControl('',[Validators.required]),
    status : new FormControl('AVAILABLE',Validators.required),
  })

  constructor(private driverService : DriverService,private driverOpsService : DriverOpsService,private notif : NotificationService){

  }

  ngOnInit(): void {
      this.driverCabsSubscription = this.driverService.driverOwnedCabs().subscribe((res:Cab[] | []) =>{
        this.driverCabs = res;
      })

      this.checkOperationalSubscription = this.driverOpsService.checkIfOperational().subscribe((res ) =>{
        if(res.data){
          this.isDriverOps = res.data;
        }
      })
      
      this.setStartTime()
      this.getAverageRatingOfDriver();
  }

  setStartTime(){
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = `${hours}:${minutes}`;
  
    this.addDriverOperationalForm.patchValue({
      startTime: currentTime
    });
  }

  getAverageRatingOfDriver(){
   this.driverRatingSubs = this.driverService.getAverageRatingOfDriver().subscribe((res : DriverRatingResponse) => {
      this.driverRating = res.rating;
    });
  }

  onSubmit(){
    const selectedCabId = this.cabId.value;
    if(selectedCabId){
      const newDriverOps : DriverOps = {
        startTime : this.addDriverOperationalForm.value.startTime!,
        endTime : this.addDriverOperationalForm.value.endTime!,
        cabStatus : 'AVAILABLE',
        cab : {
          id : selectedCabId[0]
        }
      }
      
      this.addDriverOpsSubscription = this.driverOpsService.addDriverOps(newDriverOps).subscribe((res : DriverOpsRes) =>{
        this.notif.showSuccess("Your Operational Now")
        this.isDriverOps = res
      })
    }
  }

  onLogout(){
    this.driverOpsService.removeDriverOps(this.isDriverOps?.driver.id!).subscribe((res : string) =>{
      this.notif.showSuccess(res);
      this.isDriverOps = null;
    })
  }
  ngOnDestroy(): void {
      this.addDriverOpsSubscription?.unsubscribe()
      this.driverCabsSubscription?.unsubscribe()
      this.driverRatingSubs?.unsubscribe()
    
  }
}
