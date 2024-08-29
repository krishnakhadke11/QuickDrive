import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {  MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-map',
  standalone : true,
  imports : [StarRatingComponent,MatToolbarModule,MatCardModule,MatFormFieldModule,MatIconModule,MatInputModule,MatButtonModule],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {




  constructor(private http : HttpClient){

  }

  ngOnInit(): void {

  }

  endShift() {
    // Implement end shift logic here
  }
}
