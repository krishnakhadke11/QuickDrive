import { Component, OnInit } from '@angular/core';
import { RideCardComponent } from '../ride-card/ride-card.component';
import { CommonModule } from '@angular/common';
import { Ride } from '../../../../core/models/Ride';
import { RideService } from '../../../../core/services/ride.service';

@Component({
  selector: 'app-ride',
  standalone: true,
  imports: [RideCardComponent,CommonModule],
  templateUrl: './ride.component.html',
  styleUrl: './ride.component.css'
})
export class RideComponent implements OnInit{
  rides : Ride[] = [];

  constructor(private rideService : RideService){

  }

  ngOnInit(): void {
    this.rideService.getCustomersRides().subscribe((res : Ride[]) =>{
      if(res){
        this.rides = res;
      }
    });
  }

}
