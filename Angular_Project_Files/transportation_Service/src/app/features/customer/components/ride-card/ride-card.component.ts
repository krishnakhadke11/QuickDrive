import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ride-card',
  standalone: true,
  imports: [MatCardModule,MatIconModule],
  templateUrl: './ride-card.component.html',
  styleUrl: './ride-card.component.css'
})
export class RideCardComponent {

}
