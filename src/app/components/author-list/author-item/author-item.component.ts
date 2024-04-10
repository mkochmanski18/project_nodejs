import { Component, Input } from '@angular/core';
import { Author } from '../../../shared/interfaces/author.interface';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-author-item',
  templateUrl: './author-item.component.html',
  styleUrl: './author-item.component.scss'
})
export class AuthorItemComponent {
  @Input() author!:Author;
  @Input() index!:number;

  constructor(
    private bookService: BookService
  ){}
  
  deleteAuthor(id:number){
    this.bookService.deleteAuthor(id);
  }
}
