import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";
import { User } from "../shared/interfaces/user.interface";

@Injectable({providedIn:'root'})
export class AuthService{
    constructor(
        private http: HttpClient,
    ){}
    apiAdress = 'https://booksappi.azurewebsites.net/';

    register(formData:{username:string,firstname:string,lastname:string,email:string,gender:string,password:string,reapetedPassword:string}){
        const requestBody={
            name:formData.username,
            firstname:formData.firstname,
            lastname:formData.lastname,
            sex:formData.gender,
            email:formData.email,
            pwd:formData.password
        }
        return this.http.post(this.apiAdress+'/user/registration',{requestBody}, { withCredentials: true });
        
    }

    login(loginData:{email:string,password:string}){
        const requestBody={
            email:loginData.email,
            password:loginData.password
        }
        return this.http.post<User>(this.apiAdress+'/auth/login',{...requestBody}, { withCredentials: true })
    }
    logout(){
        return this.http.get(this.apiAdress+'/auth/logout', { withCredentials: true });
    }
}