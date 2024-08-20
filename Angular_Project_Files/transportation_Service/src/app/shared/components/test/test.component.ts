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

@Component({
  selector: 'app-map',
  standalone : true,
  imports : [MatButtonModule,CommonModule,MatCardModule,MatListModule,MatIconModule,MatDividerModule,MatToolbarModule],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {

  user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@example.com',
    phoneNumber: '+1234567890',
    address: '123 Main St, Springfield',
    role: 'Driver',
    drivingLicense: 'DL123456'
  };

  

  editProfile() {
    // Logic to navigate to the edit page or open a dialog for editing
  }


  constructor(private http : HttpClient){

  }

  ngOnInit(): void {

  }
}
