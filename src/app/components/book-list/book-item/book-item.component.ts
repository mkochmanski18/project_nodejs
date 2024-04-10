import { Component, Input } from '@angular/core';
import { Book } from '../../../shared/interfaces/book.interface';
import { BookService } from '../../../services/book.service';
import { Author } from '../../../shared/interfaces/author.interface';
import { Genre } from '../../../shared/interfaces/genre.interface';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.scss'
})
export class BookItemComponent {
  @Input() book!:Book;
  @Input() index!:number;

  author!:Author;
  genre!:Genre;

  constructor(
    private bookService: BookService
  ){}
  
  ngOnInit(){
    this.bookService.getSingleAuthor(this.book.authorId).subscribe({
      next:res=>{
        this.author = res;
      }
    });
    this.bookService.getSingleGenre(this.book.genreId).subscribe({
      next:res=>{
        this.genre = res;
      }
    });
  }

  deleteBook(id:number){
    this.bookService.deleteBook(id);
  }
}
