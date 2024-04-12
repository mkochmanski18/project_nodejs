import { Injectable } from "@angular/core";
import { RecensionDetails, RecensionList } from "../shared/interfaces/recension.interface";
import { Subject } from "rxjs";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType
} from '@angular/common/http';
import { environment } from "../../../environment";

@Injectable({providedIn:'root'})
export class RecensionService{
    
  constructor(private http: HttpClient) {}

    recensionList:RecensionDetails[]=[];

    recensionListChange = new Subject<RecensionDetails[]>();
    
    ngOnInit(){
       
    }

   getReviews(id:number){
    return this.http.get<RecensionList>(environment.apiUrl+'api/Review/book/'+id);
   }
   getReviewDetails(id:number){
    return this.http.get<RecensionList>(environment.apiUrl+'api/Review/'+id);
   }
   reviewPlus(id:number){
    return this.http.post(environment.apiUrl+'/api/Review/'+id+'/plus',{});
   }
}