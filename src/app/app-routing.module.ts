import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecensionListComponent } from './components/recension-list/recension-list.component';
import { RecensionPageComponent } from './components/recension-page/recension-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';

const routes: Routes = [
    {path:'list',component:RecensionListComponent},
    {path:'sign-in',component:LoginPageComponent},
    {path:'sign-on',component:RegistrationPageComponent},
    {path:'details/:id',component:RecensionPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
