import { Component } from '@angular/core';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from '../../shared/interfaces/book.interface';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {
  books!:Book[];
  booksSub!: Subscription;
  newname:string = '';
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
  }

  ngOnDestroy(){
    this.booksSub.unsubscribe();
  }

  getBooks(){
    const res = this.bookService.getAllBooks().subscribe({
      next:(res)=>{
          this.bookService.setBooks(res);
      },
      error:(err)=>{
        this.error="Błąd pobierania danych!";
      }
  });
  }
  createNewBook(){
    if(this.newname!='') {
      this.bookService.createBook(this.newname,'',1,1).subscribe({
        next:()=>{
            this.getBooks();
            this.newname='';
            this.error = '';
        },
        error:(err)=>{
          if(err.status==401){
            this.authService.isLogged.next(false);
            this.router.navigate(['../sign-in'],{relativeTo:this.route});
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
