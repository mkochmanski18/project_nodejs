import { Component, Input } from '@angular/core';
import { Book } from '../../../shared/interfaces/book.interface';
import { BookService } from '../../../services/book.service';
import { Author } from '../../../shared/interfaces/author.interface';
import { Genre } from '../../../shared/interfaces/genre.interface';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private bookService: BookService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
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
    this.bookService.deleteBook(id).subscribe({
      next:()=>{
        this.bookService.getAllBooks().subscribe({
          next:res=>{
            this.bookService.bookListChange.next(res.items);
          }
        });
      },
      error:(err)=>{
        if(err.status==401){
          this.authService.logout();
          this.router.navigate(['../sign-in'],{relativeTo:this.route});
          this.authService.isLogged.next(false);
        }
      }
    });
  }
}
