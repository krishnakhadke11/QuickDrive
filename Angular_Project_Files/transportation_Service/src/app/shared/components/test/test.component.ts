import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounce, interval, map, Observable, startWith, Subject } from 'rxjs';
import { Feature, MapboxService } from '../../../core/services/mapbox.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    CommonModule,FormsModule,AsyncPipe
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit{
  myControl = new FormControl<string>('');
  options: Feature[] = [];
  filteredOptions!: Observable<Feature[]>;

  constructor(private mapboxService : MapboxService){ 

  }
  ngOnInit(): void {
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || ''))
      );

      this.myControl.valueChanges.subscribe(searchTerm =>{
        debounce(() => interval(2000))
        console.log(searchTerm)
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
    const filterValue = value?.toLowerCase() || '';

    return this.options.filter(option => 
    option.place_name.toLowerCase().includes(filterValue)
    );
  }

  displayFn(option : Feature){
    return option ? option.place_name : '';
  }

}
