import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { User } from "../shared/interfaces/user.interface";
import { environment } from "../../../environment";
import { Token } from "../shared/interfaces/token.interface";

@Injectable({providedIn:'root'})
export class AuthService{
    constructor(
        private http: HttpClient,
    ){}

    register(formData:{email:string,password:string,reapetedPassword:string}){
        const requestBody={
            email:formData.email,
            password:formData.password
        }
        return this.http.post(environment.apiUrl+'api/Auth/register',{...requestBody}, { withCredentials: false });
        
    }

    login(loginData:{email:string,password:string}){
        const requestBody={
            email:loginData.email,
            password:loginData.password
        }
        return this.http.post<Token>(environment.apiUrl+'api/Auth/login',{...requestBody}, { withCredentials: false })
    }
}