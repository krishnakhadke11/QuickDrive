import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EndRide } from '../../../../core/models/EndRide';
import { DriverService } from '../../services/driver.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-end-ride',
  standalone: true,
  imports: [CommonModule,CurrencyPipe,MatButtonModule],
  templateUrl: './end-ride.component.html',
  styleUrl: './end-ride.component.css'
})
export class EndRideComponent implements OnInit{
  endRideData : EndRide | null = null;

  constructor(private driverService : DriverService,private notif : NotificationService,private router : Router){ }
  ngOnInit(): void {
      this.endRideData = history.state.endRideData

      if(!this.endRideData){
        this.router.navigate(['/driver/riderequest']);
      }
  }

  endRide() {
    this.driverService.endRide(this.endRideData?.rideId!).subscribe((res : string) =>{
      if(res){
        this.notif.showSuccess(res);
        this.router.navigate(['/driver/riderequest'])
      }
    })
  }
}
