import { Component } from '@angular/core';
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
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ){}
  error = "";
  ngOnInit(){}

  onSubmit(form: NgForm){
    console.log(form.value)
    this.authService.login(form.value)
    .subscribe({
      next:(res)=>{
        this.router.navigate(['/chat/'+res.id],{relativeTo:this.route})
      },
      error:err=>{
        if(err.status===401||err.status===406) this.error = err.error.message;
        else this.error = 'An unknown error occurred!';
      }
    });
  }
}
