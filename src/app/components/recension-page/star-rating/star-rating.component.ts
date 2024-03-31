import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss'
})
export class StarRatingComponent {

  userRating = 0;

  @Input() rating!:number;
  get stars() {
    return Array(Math.floor(this.rating)).fill(0);
  }

  setRating(num:number){
    this.userRating = num;
  }

  
}
