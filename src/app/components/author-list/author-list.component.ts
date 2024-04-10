import { Component } from '@angular/core';
import { Author } from '../../shared/interfaces/author.interface';
import { BookService } from '../../services/book.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.scss'
})
export class AuthorListComponent {
  authors!:Author[];
  authorSub!: Subscription;
  newname:string = '';
  biography:string = '';
  dateBirth!:Date;
  dateDeath!:Date;
  error:string = '';
  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    this.authorSub = this.bookService.authorListChange.subscribe(autList=>{
      this.authors=autList;
    });
    this.authors = this.bookService.authorList;
    this.getAuthors();
  }

  ngOnDestroy(){
    this.authorSub.unsubscribe();
  }

  getAuthors(){
    const res = this.bookService.getAuthors().subscribe({
      next:(res)=>{
          this.bookService.setAuthors(res);
      },
      error:(err)=>{
        this.error="Błąd pobierania danych!";
      }
  });
  }
  createNewAuthor(){
    if(this.newname!='') {
      this.bookService.createAuthor(this.newname,this.biography,this.dateBirth,this.dateDeath).subscribe({
        next:()=>{
            this.getAuthors();
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
