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
    private route: ActivatedRoute
  ){}
  
  ngOnInit(){  
  }

  onSubmit(form: NgForm){
    this.authService.login(form.value).subscribe({
      next:(res)=>{
        localStorage.setItem("accessrev",res.accessToken);
        localStorage.setItem("refreshrev",res.refreshToken);
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
