import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './pages/posts/components/posts/posts.component';
import { PostsDetailComponent } from './pages/posts-detail/components/posts-detail/posts-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'posts', component: PostsComponent },
      { path: 'posts/:id', component: PostsDetailComponent },
      { path: '**', redirectTo: 'posts' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
