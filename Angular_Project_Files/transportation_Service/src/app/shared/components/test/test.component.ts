import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map',
  standalone : true,
  imports : [MatButtonModule,CommonModule],
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  map!: mapboxgl.Map ;
  directionsService = 'https://api.mapbox.com/directions/v5/mapbox/driving/';
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 37.75;
  lng = -122.41;
  mapboxToken: string = environment.mapbox.accessToken;

  sourceLat = 19.075784;
  sourceLng = 72.9952364;

  destLat = 19.025773;
  destLng = 73.0591845;

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
    // this.initializeMap();
  }

  initializeMap(): void {
    this.map = new mapboxgl.Map({
      accessToken: this.mapboxToken,
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.sourceLng, this.sourceLat],
    });

    this.map.on('style.load',()=>{   
      this.addRoute(
        [this.sourceLng, this.sourceLat],
        [this.destLng, this.destLat]
      );
    })

    const nav = new mapboxgl.NavigationControl();
    this.map.addControl(nav, 'top-right');

    // Optional: Add a marker for the source location
    new mapboxgl.Marker()
      .setLngLat([this.sourceLng, this.sourceLat])
      .addTo(this.map);
    
      new mapboxgl.Marker({color : 'red'})
      .setLngLat([this.destLng, this.destLat])
      .addTo(this.map);
  }
  addRoute(start: [number, number], end: [number, number]) {
    const url = `${this.directionsService}${start.join(',')};${end.join(',')}?geometries=geojson&access_token=${this.mapboxToken}`;

    this.http.get(url).subscribe((data: any) => {
      const route = data.routes[0].geometry;

      this.map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: route,
          properties : {}
        }
      });

      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5
        }
      });
    });
  }
}
