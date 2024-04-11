import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environment";
import { Book, BookList } from "../shared/interfaces/book.interface";
import { Genre, GenreList } from "../shared/interfaces/genre.interface";
import { Author, AuthorList } from "../shared/interfaces/author.interface";
import { Subject, Subscription } from "rxjs";

@Injectable({providedIn:'root'})
export class BookService{

    genreList:Genre[]=[];
    genreListChange = new Subject<Genre[]>();
    authorList:Author[]=[];
    authorListChange = new Subject<Author[]>();
    bookList:Book[]=[];
    bookListChange = new Subject<Book[]>();

    constructor(
        private http: HttpClient,
    ){}
    pageSize: number= 10;

    //Book
    setBooks(list:BookList){
        this.bookList = list.items;
        this.bookListChange.next(this.bookList);
    }
    getBooks(page:number,pageSize:number = this.pageSize,sortOrder:string='',sortColumn:string=''){
        let data={pageSize,page,sortOrder,sortColumn}
        return this.http.get<BookList>(environment.apiUrl+'api/Book',{params:data});
    }
    getAllBooks(){
        return this.http.get<BookList>(environment.apiUrl+'api/Book');
    }
    getBookDetails(id:number){
        return this.http.get<Book>(environment.apiUrl+'api/Book/'+id, {responseType: 'json'});
    }
    createBook(title:string,description:string,genreId:number,authorId:number){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("accessrev") });
        return this.http.post(environment.apiUrl+'api/Book/',{id:0,title,description,genreId,authorId},{headers:headers});
    }
    deleteBook(id:number){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("accessrev") });
        return this.http.delete(environment.apiUrl+'api/Book/'+id,{headers:headers}).subscribe({
            next:()=>{
                this.getAllBooks();
            }
        });
    }

    // Genre
    setGenres(list:GenreList){
        this.genreList = list.items;
        this.genreListChange.next(this.genreList);
    }
    getGenres(){
        return this.http.get<GenreList>(environment.apiUrl+'api/Genre/');
    }
    getSingleGenre(id:any){
        return this.http.get<Genre>(environment.apiUrl+'api/Genre/'+id);
    }
    createGenre(name:string){
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer '+localStorage.getItem("accessrev") })
        };
        return this.http.post(environment.apiUrl+'api/Genre/',{id:0,name:name},httpOptions);
        
    }
    deleteGenre(id:number){
        const httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer '+localStorage.getItem("accessrev") })
        };
        return this.http.delete(environment.apiUrl+'api/Genre/'+id,httpOptions);
    }
    editGenre(items:Genre[]){
        this.genreList = items;
        this.genreListChange.next(this.genreList);
    }
    //Author
    setAuthors(list:AuthorList){
        this.authorList = list.items;
        this.authorListChange.next(this.authorList);
    }
    getAuthors(){
        return this.http.get<AuthorList>(environment.apiUrl+'api/Author/');
    }
    getSingleAuthor(id:any){
        return this.http.get<Author>(environment.apiUrl+'api/Author/'+id);
    }
    createAuthor(name:string,biography:string,dateBirth:Date,dateDeath:Date){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("accessrev") });
        return this.http.post(environment.apiUrl+'api/Author/',{id:0,name,biography,dateBirth,dateDeath},{headers:headers});
    }
    deleteAuthor(id:number){
        let headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem("accessrev") });
        return this.http.delete(environment.apiUrl+'api/Author/'+id,{headers:headers});
    }
    
}