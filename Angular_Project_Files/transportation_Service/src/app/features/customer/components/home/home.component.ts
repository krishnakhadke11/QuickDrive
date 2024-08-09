import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Subscription, throwError } from 'rxjs';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { FareService } from '../../services/fare.service';
import { Router } from '@angular/router';
import { fare } from '../../../../core/models/fareData';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatFormFieldModule,AutocompleteComponent,MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnDestroy{
  fareSubscription : Subscription | undefined;
  pickupCoordinates: [number, number] | null = null;
  dropCoordinates: [number, number] | null = null;
  
  constructor(private fareService : FareService,private router : Router){

  }

  onPickupCoordinates(coordinates: [number, number]) {
    this.pickupCoordinates = coordinates;
  }
 
  onDropCoordinates(coordinates: [number, number]) {
    this.dropCoordinates = coordinates;
  }

  onCheckExpense(){
    console.log(this.pickupCoordinates)
    console.log(this.dropCoordinates)
    if(this.pickupCoordinates != null && this.dropCoordinates != null){
      const pickupCoordinatesStr = this.pickupCoordinates[1] + "," + this.pickupCoordinates[0];
      const dropCoordinatesStr = this.dropCoordinates[1] + "," + this.dropCoordinates[0];

      this.fareSubscription = this.fareService.checkExpense(pickupCoordinatesStr,dropCoordinatesStr).subscribe((res : fare)=>{
        console.log(res);
        if(res){
          this.router.navigate(['/customer/fare'],{state : {fareData : res}})
        }
      })
    }else{
      throwError(()=> "Please Enter Pickup And Drop Location")
    } 
  }

  ngOnDestroy(): void {
    this.fareSubscription?.unsubscribe()
  }
}
