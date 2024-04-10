import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'recenzje_client';
  isLogged!:boolean;
  logSub!:Subscription;
  constructor(
    private authService: AuthService
  ){}

  ngOnInit(){
    //this.authService.useRefreshToken();
    this.logSub = this.authService.isLogged.subscribe(value=>{
      this.isLogged = value;
      console.log(this.isLogged);
    });
  }

  ngOnDestroy(){
    this.logSub.unsubscribe();
  }
}
