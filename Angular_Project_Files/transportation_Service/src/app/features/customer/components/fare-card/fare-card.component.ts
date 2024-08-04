import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-fare-card',
  standalone: true,
  imports: [MatCardModule,CurrencyPipe],
  templateUrl: './fare-card.component.html',
  styleUrl: './fare-card.component.css'
})
export class FareCardComponent {
  @Input() fareAmount!: number;
  @Input() distance!: number;
  @Input() vehicleType!: string;
  @Input() paymentType!: string;
}
