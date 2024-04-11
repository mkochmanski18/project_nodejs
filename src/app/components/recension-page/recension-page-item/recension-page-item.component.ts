import { Component, Input } from '@angular/core';
import { RecensionDetails } from '../../../shared/interfaces/recension.interface';
import { RecensionService } from '../../../services/recension.service';

@Component({
  selector: 'app-recension-page-item',
  templateUrl: './recension-page-item.component.html',
  styleUrl: './recension-page-item.component.scss'
})
export class RecensionPageItemComponent {
  @Input() review!:RecensionDetails;

  constructor(
    private recensionService: RecensionService
  ){}
  like(){
    this.recensionService.reviewPlus(this.review.id);
  }
}
