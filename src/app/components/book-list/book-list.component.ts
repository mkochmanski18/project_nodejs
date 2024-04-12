import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from '../../shared/interfaces/book.interface';
import { Author } from '../../shared/interfaces/author.interface';
import { Genre } from '../../shared/interfaces/genre.interface';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {
  books!:Book[];
  booksSub!: Subscription;
  authors!:Author[];
  authorsSub!: Subscription;
  genres!:Genre[];
  genresSub!: Subscription;

  title:string = '';
  description:string = '';
  author!:number;
  genre!:number;
  error:string = '';
  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    this.booksSub = this.bookService.bookListChange.subscribe(bList=>{
      this.books=bList;
    });
    this.books = this.bookService.bookList;
    this.getBooks();
    this.authorsSub = this.bookService.authorListChange.subscribe(aList=>{
      this.authors=aList;
    });
    this.getAuthors();
    this.genresSub = this.bookService.genreListChange.subscribe(gList=>{
      this.genres=gList;
    });
    this.getGenres();
  }

  ngOnDestroy(){
    this.booksSub.unsubscribe();
  }

  getBooks(){
    this.bookService.getAllBooks().subscribe({
      next:(res)=>{
          this.bookService.setBooks(res);
      },
      error:(err)=>{
        this.error="Błąd pobierania woluminów książek!";
      }
  });
  }
  getAuthors(){
    this.bookService.getAuthors().subscribe({
      next:(res)=>{
          this.bookService.setAuthors(res);
      },
      error:(err)=>{
        this.error="Błąd pobierania autorów!";
      }
  });
  }
  getGenres(){
    this.bookService.getGenres().subscribe({
      next:(res)=>{
          this.bookService.setGenres(res);
      },
      error:(err)=>{
        this.error="Błąd pobierania gatunków!";
      }
  });
  }
  createNewBook(){
    const genreId = this.genre;
    const authorId = this.author;
    if(this.title!='' && this.description) {
      this.bookService.createBook(this.title,this.description,genreId,authorId).subscribe({
        next:()=>{
            this.getBooks();
            this.title='';
            this.description='';
            this.error = '';
        },
        error:(err)=>{
          if(err.status==401){
            this.authService.logout();
            this.router.navigate(['../sign-in'],{relativeTo:this.route});
            this.authService.isLogged.next(false);
          }
          else{
            this.error = 'Nieznany błąd serwera';
          }
        }
    });
    }
    else this.error = 'Nie podano nazwy!'
  };
}
