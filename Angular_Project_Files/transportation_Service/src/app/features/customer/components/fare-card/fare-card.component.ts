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
  @Input()fareAmount!: number | undefined;
  @Input() distance!: string | undefined;
  @Input() vehicleType!: string | null;
  @Input() paymentType!: string | null;
}
