import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { User } from "../shared/interfaces/user.interface";
import { environment } from "../../../environment";

@Injectable({providedIn:'root'})
export class AuthService{
    constructor(
        private http: HttpClient,
    ){}
    apiAdress = 'https://booksappi.azurewebsites.net/';

    register(formData:{email:string,password:string,reapetedPassword:string}){
        const requestBody={
            email:formData.email,
            pwd:formData.password
        }
        return this.http.post(environment.apiUrl+'/Auth/register',{requestBody}, { withCredentials: true });
        
    }

    login(loginData:{email:string,password:string}){
        const requestBody={
            email:loginData.email,
            password:loginData.password
        }
        return this.http.post<User>(environment.apiUrl+'/Auth/login',{requestBody}, { withCredentials: true })
    }
}