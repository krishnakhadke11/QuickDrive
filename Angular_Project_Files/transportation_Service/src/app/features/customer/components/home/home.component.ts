import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule  } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Feature, MapboxService } from '../../../../core/services/mapbox.service';
import { debounce, debounceTime, interval, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,MatAutocompleteModule,AsyncPipe,CommonModule,ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  pickupLocation = new FormControl<string>('');
  dropLocation = new FormControl<string>('');

  pickupOptions: Feature[] = [];
  dropOptions: Feature[] = [];
  
  filteredPickup!: Observable<Feature[]>;
  filteredDrop!: Observable<Feature[]>;

  constructor(private mapboxService : MapboxService){ 

  }
  ngOnInit(): void {

    this.filteredPickup = this.pickupLocation.valueChanges.pipe(
      startWith(''),
      map(value => this._filterPickup(value || ""))
    );  

    this.pickupLocation.valueChanges.pipe(debounceTime(0)).subscribe(searchTerm =>{
      console.log(searchTerm)
      if (searchTerm && searchTerm.length > 0) {        
        this.mapboxService
          .search_word(searchTerm)
          .subscribe((features: Feature[]) => {
            this.pickupOptions  = features
          });
        } else {
          this.pickupOptions = [];
        }
    });

    this.filteredDrop = this.pickupLocation.valueChanges.pipe(
      startWith(''),
      map(value => this._filterDrop(value || ""))
    );  

    this.dropLocation.valueChanges.pipe(debounceTime(0)).subscribe(searchTerm =>{
      console.log(searchTerm)
      if (searchTerm && searchTerm.length > 0) {        
        this.mapboxService
          .search_word(searchTerm)
          .subscribe((features: Feature[]) => {
            this.dropOptions  = features
          });
        } else {
          this.dropOptions = [];
        }
    });
  }

  private _filterPickup(value : string) : Feature[] {
    const filterValue = value.toString().toLowerCase() || '';

    return this.pickupOptions.filter(option => 
    option.place_name.toLowerCase().includes(filterValue)
    );
  }
  private _filterDrop(value : string) : Feature[] {
    const filterValue = value.toString().toLowerCase() || '';

    return this.dropOptions.filter(option => 
    option.place_name.toLowerCase().includes(filterValue)
    );
  }

  displayFn1(option : Feature){
    return option ? option.place_name : '';
  }
  displayFn2(option : Feature){
    return option ? option.place_name : '';
  }

}
