import { Component, ViewChild } from '@angular/core';
import { User } from '../../shared/interfaces/user.interface';
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

  httpError:boolean = false;
  error!:string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ){}
  
  ngOnInit(){  
  }

  onSubmit(form: NgForm){
    this.authService.login(form.value)
    .subscribe({
      next:(res)=>{
        console.log(res)
        this.router.navigate(['/list'],{relativeTo:this.route})
      },
      error:err=>{
        if(err.status===401||err.status===406) this.error = err.error.message;
        else this.error = 'Wystąpił nieznany błąd!';
      }
    });
  }
}
