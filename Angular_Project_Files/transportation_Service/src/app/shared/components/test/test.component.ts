import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-map',
  standalone : true,
  imports : [StarRatingComponent,MatToolbarModule],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {




  constructor(private http : HttpClient){

  }

  ngOnInit(): void {

  }
}
