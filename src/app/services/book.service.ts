import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environment";
import { Book } from "../shared/interfaces/book.interface";

@Injectable({providedIn:'root'})
export class BookService{
    constructor(
        private http: HttpClient,
    ){}
    pageSize: number= 10;


    getBooks(page:number,pageSize:number = this.pageSize,sortOrder:string='',sortColumn:string=''){
        let data={pageSize,page,sortOrder,sortColumn}
        return this.http.get(environment.apiUrl+'api/Book',{
        params:data});
    }
    getBookDetails(id:number){
        return this.http.get<Book>(environment.apiUrl+'api/Book/'+id, {responseType: 'json'});
    }
}