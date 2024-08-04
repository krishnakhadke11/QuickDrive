import { Component } from '@angular/core';
import { FareCardComponent } from '../fare-card/fare-card.component';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-fare-summary',
  standalone: true,
  imports: [FareCardComponent,MatDividerModule],
  templateUrl: './fare-summary.component.html',
  styleUrl: './fare-summary.component.css'
})
export class FareSummaryComponent {

}
