import { Injectable } from '@angular/core';
import { PostsInterfaces } from '../../interfaces/posts.interfaces';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostDetailService {
  //API_URL: string = 'https://jsonplaceholder.typicode.com/todos/';
  private API_URL: string = environment.API_URL;

  constructor(private httpClient: HttpClient) {}

  getPosts(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL).pipe(      //hago un get a la api, devuelve un objeto con la propiedad posts
      map((response) => ({ posts: response }))
    );
  }

  getPostDetail(id: number): Observable<PostsInterfaces> {
    const url = `<span class="math-inline">\{this\.API\_URL\}/</span>{id}`; //construyo la url para que llegue con el id seleccionado desde el boton detalle
    return this.httpClient.get<PostsInterfaces>(url);//hago un get para obtener un unico posts
  }
}
