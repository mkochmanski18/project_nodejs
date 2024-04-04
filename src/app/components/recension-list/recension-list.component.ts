import { Component } from '@angular/core';
import { RecensionDetails } from '../../shared/interfaces/recension.interface';
import { Subscription } from 'rxjs';
import { RecensionService } from '../../services/recension.service';
import { BookService } from '../../services/book.service';
import { Book } from '../../shared/interfaces/book.interface';

@Component({
  selector: 'app-recension-list',
  templateUrl: './recension-list.component.html',
  styleUrl: './recension-list.component.scss'
})
export class RecensionListComponent {
  
  constructor(
    private recensionService: RecensionService,
    private bookService: BookService
  ){}
  error!:string;
  activePage:number = 1;
  books!:Book[];
  //recensionSub!:Subscription;

  ngOnInit(){
    
    this.request()
    // this.recensionSub = this.recensionService.recensionListChange.subscribe(
    //   newValues=>this.recensions=newValues
    // );
    
  }

  changePage(num:number){
    this.activePage=num;
    this.request();
  }
  request(){
    this.bookService.getBooks(this.activePage,2).subscribe(
      {
        next:(res)=>{
          let object = Object.entries(res);
          let array = object[0][1];
          
          this.books = array;
          console.log([...array])
        },
        error:err=>{
          this.error = err.error.message;
        }
      }
    );
  }
}
