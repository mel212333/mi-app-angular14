import { Component, OnInit } from '@angular/core';
import { PostsInterfaces } from 'src/app/pages/interfaces/posts.interfaces';
import { PostsserviesComponent } from 'src/app/pages/posts/services/post.service';
import { PostDetailService } from '../../services/post-detail.service';

@Component({
  selector: 'app-posts-detail',
  templateUrl: './posts-detail.component.html',
  styleUrls: ['./posts-detail.component.css'],
})
export class PostsDetailComponent implements OnInit {
  //El objetivo d eeste componente es detallar la informacion de un posts usando el Id que obtengo de un servicio
  //uso Oninit para iniciarlizar el componente
  postId: number | null = null;
  postDetails: PostsInterfaces | null = null; //defina la forma o modelo de uin posts

  constructor(
    private postsServices: PostsserviesComponent,
    private postDetailService: PostDetailService //servicio para obtener datos
  ) {}

  ngOnInit(): void {
    this.postId = this.postsServices.getSelectedPostId(); //contulta al servicio, tomo el id y lo guardo en postId, esto ocurre cuando precionamos el boton Detelle
    if (this.postId) {
      //si lo tiene , llamo al metodo getPostDetail para los demas datos , detalle del posts
      this.getPostDetails(this.postId);
    } else {
      // si no lo tiene muestra un msj de advertecia
      console.warn('No se recibió el ID del post.');
    }
  }

  getPostDetails(id: number) {
    this.postDetailService.getPostDetail(id).subscribe({
      //Llama al backend para buscar el detalle del post con ese id, si  tiene exito los guarda en postDetails
      next: (post) => {
        this.postDetails = post;
      },
      error: (err) => {
        //si no, muestra un msjs de error
        console.error('Error al obtener detalles del post:', err);
      },
    });
  }
}
