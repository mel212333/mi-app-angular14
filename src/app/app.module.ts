import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // <--- ¡Importa HttpClientModule!

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PostsComponent } from './pages/posts/components/posts/posts.component';
import { PostsDetailComponent } from './pages/posts-detail/components/posts-detail/posts-detail.component';
import { PostsserviesComponent } from './pages/posts/services/post.service';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    //PostsComponent,
    PostsDetailComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, CommonModule],
  providers: [PostsserviesComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
