import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsInterfaces } from 'src/app/pages/interfaces/posts.interfaces';
import { PostDetailService } from '../../services/post-detail.service';
import { PostsserviesComponent } from 'src/app/pages/posts/services/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts-detail',
  templateUrl: './posts-detail.component.html',
  styleUrls: ['./posts-detail.component.css'],
})
export class PostsDetailComponent implements OnInit, OnDestroy {
  postId: number | null = null;
  postDetails: PostsInterfaces | null = null;
  private postIdSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private postDetailService: PostDetailService, // Inyecta PostDetailService
    private postsServices: PostsserviesComponent
  ) {}

  ngOnInit(): void {
    // Leer el ID del servicio (si no lo pasaste por la URL)
    this.postId = this.postsServices.getSelectedPostId();
    if (this.postId) {
      this.getPostDetails(this.postId);
    } else {
      // Manejar el caso donde no hay ID (ej: navegación directa sin seleccionar un post)
      console.warn('No se recibió el ID del post.');
    }
  }

  getPostDetails(id: number) {
    this.postsServices.getPostDetail(id).subscribe({
      next: (post) => {
        this.postDetails = post;
      },
      error: (err) => {
        console.error('Error al obtener detalles del post:', err);
      },
    });
  }
  ngOnDestroy(): void {
    if (this.postIdSubscription) {
      this.postIdSubscription.unsubscribe();
    }
  }
}