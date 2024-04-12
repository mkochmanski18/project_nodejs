import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'recenzje_client';
  email:string = '';
  isLogged!:boolean;
  logSub!:Subscription;
  constructor(
    private authService: AuthService
  ){}

  ngOnInit(){
    //this.authService.useRefreshToken();
    if(localStorage.getItem("accessrev")){
      this.authService.setLoggedStatus(true);
    }
    this.logSub = this.authService.isLogged.subscribe(value=>{
      this.isLogged = value;
      if(this.isLogged && localStorage.getItem("accessrev")){
        const token = localStorage.getItem("accessrev");
        if(token){
          const decoded:{aud:string,email:string,exp:number,iat:number,iss:string,nameid:string,nbf:string,role:string,sub:string,unique_name:string} = jwtDecode(token);
          this.email = decoded.email;
        }
      }
    });
    this.isLogged = this.authService.loggStatus;
  }

  ngOnDestroy(){
    this.logSub.unsubscribe();
  }
}
