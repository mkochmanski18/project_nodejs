import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  @ViewChild('f') loginForm!: NgForm;

  error!:string;

  constructor(
    private authService: AuthService,
    private router: Router,
  ){}
  
  ngOnInit(){  
  }

  add_minutes = (dt:Date, minutes:number) => {
    // Create a new Date object representing the result of adding the specified number of minutes to the provided date
    return new Date(dt.getTime() + minutes*60000);
}

  onSubmit(form: NgForm){
    this.authService.login(form.value).subscribe({
      next:(res)=>{
        localStorage.setItem("accessrev",res.accessToken);
        localStorage.setItem("refreshrev",res.refreshToken);
        let date = this.add_minutes(new Date(), 15).toString();
        localStorage.setItem("tokenExpires",date);
        this.authService.setLoggedStatus(true);
        this.router.navigate(['']);
      },
      error:(err)=>{
        this.authService.setLoggedStatus(false);
        if(err.status === 400){
          this.error = 'Błędne dane logowania!';
        }
        else this.error = 'Nieznany błąd serwera!';
      }
    });
    
  }
}
