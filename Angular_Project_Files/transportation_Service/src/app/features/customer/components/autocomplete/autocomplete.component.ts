import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Feature, MapboxService } from '../../../../core/services/mapbox.service';
import { debounce, debounceTime, map, Observable, of, startWith, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatAutocompleteModule,AsyncPipe,ReactiveFormsModule,CommonModule  ],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css'
})
export class AutocompleteComponent {
  myControl = new FormControl<string>('');
  options: Feature[] = [];
  filteredOptions!: Observable<Feature[]>;

  @Output() coordinatesSelected = new EventEmitter<{coordinates : [number, number] , placeName : string}>();

  constructor(private mapboxService : MapboxService){ 

  }
  ngOnInit(): void {
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''), // emits the default value
        map(value => this._filter(value || ''))
      );
      // .pipe(debounce(()=>timer(1000)))
      this.myControl.valueChanges.subscribe(searchTerm =>{
        // console.log(searchTerm)
        if (searchTerm && searchTerm.length > 0) {        
          this.mapboxService
            .search_word(searchTerm)
            .subscribe((features: Feature[]) => {
              this.options  = features
            });
          } else {
            this.options = [];
          }
      });
  }

  private _filter(value : string) : Feature[] {
    const filterValue = value.toString().toLowerCase() || '';

    return this.options.filter(option => 
    option.place_name.toLowerCase().includes(filterValue)
    );
  }

  displayFn(option : Feature){
    return option ? option.place_name : '';
  }

  onOptionSelected(option: Feature) {
    if (option && option.geometry && option.geometry.coordinates) {
      this.coordinatesSelected.emit({coordinates : option.geometry.coordinates , placeName : option.text});
    }
  }
}
