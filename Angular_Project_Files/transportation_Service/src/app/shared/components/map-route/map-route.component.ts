import { Component, Input, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map-route',
  standalone: true,
  imports: [],
  templateUrl: './map-route.component.html',
  styleUrl: './map-route.component.css',
})
export class MapRouteComponent implements OnInit {
  map!: mapboxgl.Map;
  directionsService: string =
    environment.mapbox.directionService;
  style = environment.mapbox.style;
  mapboxToken: string = environment.mapbox.accessToken;

  @Input() sourceLat: number = 22.3511148;
  @Input() sourceLng: number = 78.6677428;

  @Input() destLat: number = 22.3511148;
  @Input() destLng: number = 78.6677428;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initializeMap();

    // console.log(this.sourceLat+" " + this.sourceLng +" " + this.destLat + " " + this.destLng)
  }

  initializeMap(): void {
    this.map = new mapboxgl.Map({
      accessToken: this.mapboxToken,
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.destLng, this.destLat],
      
    });

    this.map.on('style.load', () => {
      this.addRoute(
        [this.sourceLng, this.sourceLat],
        [this.destLng, this.destLat]
      );

      this.fitMapBounds(
        [this.sourceLng, this.sourceLat],
        [this.destLng, this.destLat]
      );
    });

    const nav = new mapboxgl.NavigationControl();
    this.map.addControl(nav, 'top-right');

    // Optional: Add a marker for the source location
    new mapboxgl.Marker()
      .setLngLat([this.sourceLng, this.sourceLat])
      .addTo(this.map);

    new mapboxgl.Marker({ color: 'red' })
      .setLngLat([this.destLng, this.destLat])
      .addTo(this.map);
  }

  addRoute(start: [number, number], end: [number, number]) {
    const url = `${this.directionsService}${start.join(',')};${end.join(
      ','
    )}?geometries=geojson&access_token=${this.mapboxToken}`;

    this.http.get(url).subscribe((data: any) => {
      const route = data.routes[0].geometry;

      this.map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          geometry: route,
          properties: {},
        },
      });

      this.map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5,
        },
      });
    });
  }

  fitMapBounds(start: [number, number], end: [number, number]) {
    const bounds = new mapboxgl.LngLatBounds([start, end]);
    this.map.fitBounds(bounds, {
      padding: 50,
      maxZoom: 15 
    });
  }
}
