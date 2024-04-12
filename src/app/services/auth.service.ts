import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environment";
import { Token } from "../shared/interfaces/token.interface";
import { Subject, Subscription } from "rxjs";

@Injectable({providedIn:'root'})
export class AuthService{

    loggStatus:boolean = false;
    isLogged = new Subject<boolean>();
    constructor(
        private http: HttpClient,
    ){}

    ngOnInit(){
        this.isLogged.next(false);
    }

    register(formData:{email:string,password:string,reapetedPassword:string}){
        const requestBody={
            email:formData.email,
            password:formData.password
        }
        return this.http.post(environment.apiUrl+'api/Auth/register',{...requestBody}, { withCredentials: false });
        
    }
    //log status
    setLoggedStatus(status:boolean){
        this.loggStatus = status;
        this.isLogged.next(this.loggStatus);
    }
    login(loginData:{email:string,password:string}){
        const requestBody={
            email:loginData.email,
            password:loginData.password
        };
        return this.http.post<Token>(environment.apiUrl+'api/Auth/login',{...requestBody}, { withCredentials: false });
    }

    useRefreshToken(){
        const refreshToken = localStorage.getItem("refreshrev");
        const accessToken = localStorage.getItem("accessrev");
        if(refreshToken && accessToken){
            this.http.post<Token>(environment.apiUrl+'api/Auth/refresh-token',{accessToken,refreshToken}).subscribe(
                (res:Token)=>{
                    localStorage.setItem("refreshrev",res.refreshToken);
                    localStorage.setItem("accessrev",res.accessToken);
                    this.isLogged.next(true);
                },
                error=>{
                    this.isLogged.next(false);
                }
            )
        }
        this.isLogged.next(false);
    }
    logout(){
        localStorage.removeItem("refreshrev");
        localStorage.removeItem("accessrev");
        this.setLoggedStatus(false)
        return this.http.post(environment.apiUrl+'/api/Auth/logout',{}).subscribe();
    }
}