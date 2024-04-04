import { Component, Input } from '@angular/core';
import { RecensionDetails } from '../../shared/interfaces/recension.interface';
import { ActivatedRoute } from '@angular/router';
import { RecensionService } from '../../services/recension.service';
import { BookService } from '../../services/book.service';
import { Book } from '../../shared/interfaces/book.interface';
import { environment } from '../../../../environment';

@Component({
  selector: 'app-recension-page',
  templateUrl: './recension-page.component.html',
  styleUrl: './recension-page.component.scss'
})
export class RecensionPageComponent {
  details!:Book;
  pictureUrl!:string;
  error!: string;
  constructor(
    private route: ActivatedRoute,
    private recensionService: RecensionService,
    private bookService: BookService

  ) { }
  
  ngOnInit() {
    this.route.params.subscribe(
      params => {
        //this.details = this.recensionService.getRecension(params['id']);
        this.bookService.getBookDetails(params['id']).subscribe(
          {
            next:(res)=>{
             this.details = res;
            },
            error:err=>{
              this.error = err.error.message;
            }
          }
        );
      }
    );
    this.pictureUrl=environment.imageUrl+this.details.picturePath;
  }
  
}
