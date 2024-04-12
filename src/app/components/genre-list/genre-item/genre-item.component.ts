import { Component, Input } from '@angular/core';
import { Genre } from '../../../shared/interfaces/genre.interface';
import { BookService } from '../../../services/book.service';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-genre-item',
  templateUrl: './genre-item.component.html',
  styleUrl: './genre-item.component.scss'
})
export class GenreItemComponent {
  @Input() genre!:Genre;
  @Input() index!:number;
  error!:string;
  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ){}
  
  deleteGenre(id:number){
    this.bookService.deleteGenre(id).subscribe({
      next:()=>{
          this.bookService.getGenres().subscribe({
            next:res=>{
              this.bookService.genreListChange.next(res.items);
            }
          })
      },
      error:(err)=>{
        this.error = "Nie udało się usunąć gatunku";
        if(err.status==401){
          this.authService.logout();
          this.router.navigate(['../sign-in'],{relativeTo:this.route});
          this.authService.isLogged.next(false);
        }
      }
  });
  }
}
