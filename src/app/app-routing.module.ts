import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecensionListComponent } from './components/recension-list/recension-list.component';
import { RecensionPageComponent } from './components/recension-page/recension-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { GenreListComponent } from './components/genre-list/genre-list.component';
import { AuthorListComponent } from './components/author-list/author-list.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { AuthorPageComponent } from './components/author-page/author-page.component';

const routes: Routes = [
    {path:'',component:RecensionListComponent},
    {path:'sign-in',component:LoginPageComponent},
    {path:'sign-on',component:RegistrationPageComponent},
    {path:'details/:id',component:RecensionPageComponent},
    {path:'author/:id',component:AuthorPageComponent},
    {path:'genres',component:GenreListComponent},
    {path:'authors',component:AuthorListComponent},
    {path:'books',component:BookListComponent},
    {path:'*',component:RecensionPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
