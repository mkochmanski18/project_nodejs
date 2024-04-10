import { Component } from '@angular/core';
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
  pageSize:number = 2;
  books!:Book[];

  ngOnInit(){
    this.request()
  }

  changePage(num:number){
    this.activePage=num;
    this.request();
  }
  changePageSize(){
    this.request();
  }
  request(){
    this.bookService.getBooks(this.activePage,this.pageSize).subscribe(
      {
        next:(res)=>{
          
          this.books = res.items;
        },
        error:err=>{
          this.error = err.error.message;
        }
      }
    );
  }
}
