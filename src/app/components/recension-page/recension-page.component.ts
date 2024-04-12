import { Component, Input } from '@angular/core';
import { RecensionDetails } from '../../shared/interfaces/recension.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { RecensionService } from '../../services/recension.service';
import { BookService } from '../../services/book.service';
import { Book } from '../../shared/interfaces/book.interface';
import { environment } from '../../../../environment';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recension-page',
  templateUrl: './recension-page.component.html',
  styleUrl: './recension-page.component.scss'
})
export class RecensionPageComponent {
  isLogged!:boolean;
  logSub!:Subscription;
  
  details!:Book;
  reviews!:RecensionDetails[];
  pictureUrl!:string;
  uploadedImage!:File;
  authorPageLink:string = '';
  error!: string;
  revError!:string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recensionService: RecensionService,
    private bookService: BookService,
    private authService: AuthService
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
  ngOnDestroy(){
    this.logSub.unsubscribe();
  }
  getBookById(id:number){
    this.bookService.getBookDetails(id).subscribe(
      {
        next:(res)=>{
         this.details = res;
         this.pictureUrl=environment.imageUrl+this.details.picturePath;
         this.recensionService.getReviews(res.id).subscribe({
          next:data=>{
            this.reviews=data.items;
          },
          error:er=>{
            this.revError = "Nie udało się pobrać recenzji";
          }
         })
        },
        error:err=>{
          this.error = err.error.message;
        }
      }
    );
  }
  onUpdatePhoto(){
    const imageFormData = new FormData();
     imageFormData.append('file', this.uploadedImage, this.uploadedImage.name);
     this.bookService.updateBookImage(this.details.id,imageFormData).subscribe({
      error:(err)=>{
        this.error=err;
        if(err.status === 401){
          this.authService.logout();
          this.router.navigate(['../sign-in'],{relativeTo:this.route});
          this.authService.isLogged.next(false);
        }
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
