import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';


export interface MapboxOutput {
  attribution: string;
  features: Feature[];
  query: [];
}

export interface Feature {
  place_name: string;
}

@Injectable({
  providedIn: 'root',
})
export class MapboxService {
  constructor(private http: HttpClient) {}

  search_word(query: string) : any{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?types=address&access_token=${environment.mapbox.accessToken}`;
    return this.http.get<MapboxOutput>(url)
      
  }
}
