import { Component, Input } from '@angular/core';
import { Author } from '../../../shared/interfaces/author.interface';
import { BookService } from '../../../services/book.service';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-author-item',
  templateUrl: './author-item.component.html',
  styleUrl: './author-item.component.scss'
})
export class AuthorItemComponent {
  @Input() author!:Author;
  @Input() index!:number;

  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ){}
  
  deleteAuthor(id:number){
    this.bookService.deleteAuthor(id).subscribe({
      next:()=>{
        this.bookService.getAuthors().subscribe({
          next:res=>{
            this.bookService.authorListChange.next(res.items);
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
