import { Component, OnInit } from '@angular/core';
import { FareCardComponent } from '../fare-card/fare-card.component';
import { MatDividerModule } from '@angular/material/divider';
import { fare } from '../../../../core/models/fareData';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fare-summary',
  standalone: true,
  imports: [FareCardComponent,MatDividerModule],
  templateUrl: './fare-summary.component.html',
  styleUrl: './fare-summary.component.css'
})
export class FareSummaryComponent implements OnInit{
  fareData : fare | null = null;
  constructor(private router : Router){

  }
  ngOnInit(): void {
    this.fareData = history.state.fareData

    if(!this.fareData){
      this.router.navigate(['/customer']);
    }
  }

}
