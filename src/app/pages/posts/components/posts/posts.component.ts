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

  postsList: PostsInterfaces[] = []; //declaro una lista vacia para que llene con los datos de la api

  constructor( //inyecto el servicio que hace las llamadas a la api y el touter para poder navegar entre rutas
    private postsServices: PostsserviesComponent,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postsServices.getPosts().subscribe({ //llamo al servicio con getPost, el cual hace una peticion a ñla api
      next: (result) => {
        console.log('posts recibidos', JSON.stringify(result));

        this.postsList = result.posts;//si tiene exito la guarda en la lista postList
      },
      error: (err) => {
        console.log(err);//si hay error lo muestra por sonsola
      },
    });
  }

  verDetalle(postId: number) {
    this.postsServices.setSelectedPostId(postId); // guarda el postsId seleccionado para tenerlo disponible para usarlo
    this.router.navigate(['/posts', postId]); // Navega a la página de detalles usando el ID en la URL
  }

}
