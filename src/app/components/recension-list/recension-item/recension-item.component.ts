import { Component, Input } from '@angular/core';
import { RecensionDetails } from '../../../shared/interfaces/recension.interface';

@Component({
  selector: 'app-recension-item',
  templateUrl: './recension-item.component.html',
  styleUrl: './recension-item.component.scss'
})
export class RecensionItemComponent {

  @Input() recensionDetails!:RecensionDetails;

}
