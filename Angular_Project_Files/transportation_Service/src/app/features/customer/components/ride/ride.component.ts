import { Component } from '@angular/core';
import { RideCardComponent } from '../ride-card/ride-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ride',
  standalone: true,
  imports: [RideCardComponent,CommonModule],
  templateUrl: './ride.component.html',
  styleUrl: './ride.component.css'
})
export class RideComponent {
  rides = new Array(6).fill(null);

}
