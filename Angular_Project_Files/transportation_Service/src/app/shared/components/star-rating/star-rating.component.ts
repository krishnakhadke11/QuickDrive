import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [MatIconButton,MatButtonModule,MatIconModule,MatTooltipModule,CommonModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {

  @Input('disabled') disabled : boolean = true;
  @Input('rating')  rating: number = 0;
  @Input('starCount')  starCount: number = 5;
  @Output()  ratingUpdated = new EventEmitter<number>();

  ratingArr : number[] = [];

  ngOnInit(): void {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }

  onClick(rating:number) {
    this.rating = rating
    console.log(rating)
    if(!this.disabled){
      this.ratingUpdated.emit(rating);
    }
    return false;
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

}
