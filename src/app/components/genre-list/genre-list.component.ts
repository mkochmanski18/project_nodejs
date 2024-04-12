import { Component } from '@angular/core';
import { Genre } from '../../shared/interfaces/genre.interface';
import { BookService } from '../../services/book.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrl: './genre-list.component.scss'
})
export class GenreListComponent {
  genres!:Genre[];
  genreSub!: Subscription;
  newname:string = '';
  error:string = '';
  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    this.genreSub = this.bookService.genreListChange.subscribe(genList=>{
      this.genres=genList;
    });
    this.genres = this.bookService.genreList;
    this.getGenres();
  }

  ngOnDestroy(){
    this.genreSub.unsubscribe();
  }

  getGenres(){
    this.bookService.getGenres().subscribe({
      next:(res)=>{
        this.bookService.setGenres(res);
      },
      error:(err)=>{
        this.error="Błąd pobierania danych!";
      }
  })

    //if(res=== -1) ";
  }
  createNewGenre(){
    if(this.newname!='') {
      this.bookService.createGenre(this.newname).subscribe({
        next:()=>{
            this.getGenres();
            this.newname='';
            this.error = '';
        },
        error:(err:{header:Object[],message:string,name:string, ok: boolean, status:number,statusText:string, url:string})=>{
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
