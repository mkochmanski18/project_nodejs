import { Injectable } from "@angular/core";
import { RecensionDetails } from "../shared/interfaces/recension.interface";
import { Subject, throwError } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({providedIn:'root'})
export class RecensionService{
    
  constructor(private http: HttpClient) {}

    recensionList:RecensionDetails[]=[
      ];

    recensionListChange = new Subject<RecensionDetails[]>;
    
    ngOnInit(){
        this.recensionListChange.next(this.recensionList);
    }

    addNewRecension(newSet:RecensionDetails){
        try{
            this.recensionList.push(newSet);
            this.recensionListChange.next(this.recensionList);
            return 1
        }
        catch{
            return -1
        }
    }
     
    deleteRecension(set:RecensionDetails){
        try{
            const index = this.recensionList.findIndex(object=>object.id===set.id);
            delete this.recensionList[index];
            return 1;
        }
        catch{return -1}
    }

    getRecension(id:string){
        const index = this.recensionList.findIndex(object=>object.id===id);
        return this.recensionList[index];
    }

    // -----------------------------------------

    fetchReviews(id:number,page:number, sortOrder:string,sortColumn:string){
      return this.http
        .get<any>(
          'https://booksappi.azurewebsites.net/api/Book?Page='+page+'&PageSize=10',
          {
            headers: new HttpHeaders({ 'Access-Control-Allow-Origin': 'localhost'})
          }
        );
    }
}