import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';

import { FormsModule } from '@angular/forms';
import {LoginService} from './login.service';
import {BlogService} from './blog.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BlogformComponent } from './home/blogform/blogform.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlogformComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [LoginService, BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
