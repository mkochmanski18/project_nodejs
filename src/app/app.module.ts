import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecensionListComponent } from './components/recension-list/recension-list.component';
import { RecensionItemComponent } from './components/recension-list/recension-item/recension-item.component';
import { RecensionPageComponent } from './components/recension-page/recension-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { StarRatingComponent } from './components/recension-page/star-rating/star-rating.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { GenreListComponent } from './components/genre-list/genre-list.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { AuthorListComponent } from './components/author-list/author-list.component';
import { GenreItemComponent } from './components/genre-list/genre-item/genre-item.component';
import { AuthorItemComponent } from './components/author-list/author-item/author-item.component';
import { BookItemComponent } from './components/book-list/book-item/book-item.component';
import { RecensionPageItemComponent } from './components/recension-page/recension-page-item/recension-page-item.component';
import { AuthorPageComponent } from './components/author-page/author-page.component';

@NgModule({
  declarations: [
    AppComponent,
    RecensionListComponent,
    RecensionItemComponent,
    RecensionPageComponent,
    StarRatingComponent,
    RegistrationPageComponent,
    LoginPageComponent,
    GenreListComponent,
    BookListComponent,
    AuthorListComponent,
    GenreItemComponent,
    AuthorItemComponent,
    BookItemComponent,
    RecensionPageItemComponent,
    AuthorPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
