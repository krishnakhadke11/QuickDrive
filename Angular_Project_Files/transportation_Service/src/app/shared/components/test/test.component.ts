import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  map!: mapboxgl.Map ;
  directionsService = 'https://api.mapbox.com/directions/v5/mapbox/driving/';
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 37.75;
  lng = -122.41;
  mapboxToken: string =
    'pk.eyJ1Ijoia3Jpc2huYWtoYWRrZS1nZHRjIiwiYSI6ImNsemF5NXlwbzBza2cyanM4eGpoc2hjNTUifQ.O4YVe1XQM3GcGkFa3HeXvQ';

  sourceLat = 19.075784;
  sourceLng = 72.9952364;

  destLat = 19.025773;
  destLng = 73.0591845;

  constructor(private http : HttpClient){

  }

  ngOnInit(): void {
    this.initializeMap();
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
