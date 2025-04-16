import { Component, OnInit } from '@angular/core';
import { PostsInterfaces } from 'src/app/pages/interfaces/posts.interfaces';
import { PostsserviesComponent } from '../../services/post.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule],

  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  postsList: PostsInterfaces[] = [];

  constructor(
    private postsServices: PostsserviesComponent,
    private router: Router
  ) {}
  dataPadre = 'Mensaje de Post';
  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postsServices.getPosts().subscribe({
      next: (result) => {
        console.log('-', result);

        this.postsList = result.posts;
        console.log('-', this.postsList);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  verDetalle(postId: number) {
    this.postsServices.setSelectedPostId(postId); // Envía el ID a través del servicio
    this.router.navigate(['/posts', postId]); // Navega a la página de detalles usando el ID en la URL
  }

  trackPost(index: number, post: PostsInterfaces): number | undefined {
    // Asumiendo que tu interfaz PostsInterfaces tiene una propiedad 'id' que es única
    return post.id;
  }
}
