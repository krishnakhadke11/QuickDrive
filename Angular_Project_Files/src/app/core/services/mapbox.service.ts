import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, of } from 'rxjs';
import { LatLng } from '../models/LatLng';

export interface MapboxOutput {
  attribution: string;
  features: Feature[];
  query: [];
}

export interface Feature {
  coordinates: [number,number]; // Longitude,Latitude
  geometry: Feature;
  place_name: string;
  text : string
}

export interface Address{
  mapbox_id : string,
  address_number : string,
  street_name : string,
  name : string,
}
@Injectable({
  providedIn: 'root',
})
export class MapboxService {
  constructor(private http: HttpClient) {}

  search_word(query: string): Observable<Feature[]> {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?types=address&access_token=${environment.mapbox.accessToken}`;

    return this.http
      .get<MapboxOutput>(url)
      .pipe(map((response) => response.features || []));
  }

  searchAddress(location : string | undefined) : Observable<Address>{
    if(location){
      
      const [latStr, lngStr] = location.split(',');
  
      const url = `https://api.mapbox.com/search/geocode/v6/reverse?longitude=${lngStr}&latitude=${latStr}&types=address&access_token=${environment.mapbox.accessToken}`;
  
      return this.http.get(url).pipe(map((res : any) =>{

        if(res.features && res.features.length > 0){
          return res.features[0].properties.context.address;
        }else{
          return null
        }
      }), catchError((error) =>{
        return of()
      }));
    }else{
      return of()
    }
  }

  latLngExtraction(pickupLocation : string,dropLocation : string) : LatLng{
    const [srcLatStr, srcLngStr] = pickupLocation.split(',');
    const [destLatStr, destLngStr] = dropLocation.split(',');

    const srcLat = parseFloat(srcLatStr);
    const srcLng = parseFloat(srcLngStr);

    const destLat = parseFloat(destLatStr);
    const destLng = parseFloat(destLngStr);

    const sendLocation : LatLng =  {
      srcLat : srcLat,
      srcLng : srcLng,
      destLat : destLat,
      destLng : destLng
    }

    return sendLocation;

  }
}
