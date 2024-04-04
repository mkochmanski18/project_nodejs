import { Component, ViewChild } from '@angular/core';
import { User } from '../../shared/interfaces/user.interface';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CookieProviderService } from '../../services/cookieProvider.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  @ViewChild('f') loginForm!: NgForm;

  httpError:boolean = false;
  error!:string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieProviderService
  ){}
  
  ngOnInit(){  
  }

  onSubmit(form: NgForm){
    this.authService.login(form.value)
    .subscribe({
      next:(res)=>{
        console.log(res)
        this.cookieService.setCookie("accessrev-token",res.accessToken,24);
        this.cookieService.setCookie("refreshrev-token",res.refreshToken,24)
        this.router.navigate(['../'],{relativeTo:this.route})
      },
      error:err=>{
        if(err.status===400) this.error = err.error.message;
        else this.error = 'Błędne dane logowania!';
      }
    });
  }
}
