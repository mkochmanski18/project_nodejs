import { Component, Input } from '@angular/core';
import { Genre } from '../../../shared/interfaces/genre.interface';
import { BookService } from '../../../services/book.service';

@Component({
  selector: 'app-genre-item',
  templateUrl: './genre-item.component.html',
  styleUrl: './genre-item.component.scss'
})
export class GenreItemComponent {
  @Input() genre!:Genre;
  @Input() index!:number;
  
  constructor(
    private bookService: BookService
  ){}
  
  deleteGenre(id:number){
    this.bookService.deleteGenre(id);
  }
}
