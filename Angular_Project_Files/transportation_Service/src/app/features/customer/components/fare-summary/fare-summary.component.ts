import { Component, OnInit } from '@angular/core';
import { FareCardComponent } from '../fare-card/fare-card.component';
import { MatDividerModule } from '@angular/material/divider';
import { fare } from '../../../../core/models/fareData';
import { Router } from '@angular/router';
import { MapRouteComponent } from '../../../../shared/components/map-route/map-route.component';
import { MatProgressSpinnerModule, ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

interface Location {
  pickupName : string,
  dropName : string
}

@Component({
  selector: 'app-fare-summary',
  standalone: true,
  imports: [FareCardComponent, MatDividerModule, MapRouteComponent,MatProgressSpinnerModule,CommonModule],
  templateUrl: './fare-summary.component.html',
  styleUrl: './fare-summary.component.css',
})
export class FareSummaryComponent implements OnInit {
  fareData: fare | null = null;
  locationNames : Location | null = null;

  srcLat: number = 22.3511148;
  srcLng: number = 78.6677428;

  destLat: number = 22.3511148;
  destLng: number = 78.6677428;

  isSearching : boolean = false;

  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.fareData = history.state.fareData;
    this.locationNames = history.state.locationNames
    if (this.fareData) {
      const [srcLatStr, srcLngStr] = this.fareData?.pickupLocation.split(',');
      const [destLatStr, destLngStr] = this.fareData?.dropLocation.split(',');

      this.srcLat = parseFloat(srcLatStr);
      this.srcLng = parseFloat(srcLngStr);

      this.destLat = parseFloat(destLatStr);
      this.destLng = parseFloat(destLngStr);
    }

    if (!this.fareData) {
      // this.router.navigate(['/customer']);
    }
  }
}
