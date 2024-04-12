import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';
import { Author } from '../../shared/interfaces/author.interface';
import { environment } from '../../../../environment';

@Component({
  selector: 'app-author-page',
  templateUrl: './author-page.component.html',
  styleUrl: './author-page.component.scss'
})
export class AuthorPageComponent {
  isLogged!:boolean;
  logSub!:Subscription;
  
  details!:Author;
  pictureUrl!:string;
  uploadedImage!:File;
  error!: string;
  revError!:string;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private authService: AuthService,
    private router: Router,
  ) { }
  
  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.getBookById(params['id']);
      }
    );
    this.logSub = this.authService.isLogged.subscribe(value=>{
      this.isLogged = value;
    });
    this.isLogged = this.authService.loggStatus;
  }
  getBookById(id:number){
    this.bookService.getSingleAuthor(id).subscribe(
      {
        next:(res)=>{
         this.details = res;
         this.pictureUrl=environment.imageUrl+this.details.picturePath;
      },
        error:err=>{
          this.error = err.error.message;
          if(err.status === 401){
            this.authService.logout();
            this.router.navigate(['../sign-in'],{relativeTo:this.route});
            this.authService.isLogged.next(false);
          }
        }
      }
    );
  }
  onUpdatePhoto(){
    const imageFormData = new FormData();
     imageFormData.append('file', this.uploadedImage, this.uploadedImage.name);
     this.bookService.updateAuthorImage(this.details.id,imageFormData).subscribe({
      error:(err)=>{
        this.error=err;
      },
      complete: ()=>{
        this.getBookById(this.details.id);
      }
     })
  }

  async changeImage(event:any){
    this.uploadedImage = event.target.files[0];
  }
}
