import { Component, Input } from '@angular/core';
import { Book } from '../../../shared/interfaces/book.interface';
import { environment } from '../../../../../environment';

@Component({
  selector: 'app-recension-item',
  templateUrl: './recension-item.component.html',
  styleUrl: './recension-item.component.scss'
})
export class RecensionItemComponent {

  @Input() bookDetails!:Book;
  pictureUrl!:string;
  ngOnInit(){
    console.log(this.bookDetails)
    this.pictureUrl=environment.imageUrl+this.bookDetails.picturePath;
  }
}
