import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss'
})
export class RegistrationPageComponent {
  @ViewChild('f') loginForm!: NgForm;

  httpError:boolean = false;
  statement!:{text:string,class:string};

  constructor(
    private authService: AuthService
  ){}


  onSubmit(form: NgForm){
    this.authService.register(form.value)
    .subscribe({
      next:(res)=>{
        console.log(res)
      },
      error:err=>{
      }
    });
  }
  // onSubmit(form: NgForm){
  //   this.authService.register(form.value)
  //   .subscribe({
  //     complete:()=>{
  //       this.statement = {text:'Account created successfuly!',class:'alert-success'}},
  //     error:err=>{
  //       if(err.status===400) this.statement = {text:err.error.message,class:'alert-danger'}
  //       else this.statement = {text:'An unknown error occurred!',class:'alert-danger'}
  //     }
  //   })
  //   this.loginForm.reset();
  // }
}
