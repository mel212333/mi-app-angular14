import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    return this.httpClient.get<any>(this.API_URL).pipe(
      // Si la API devolviera un objeto con una propiedad "posts", podrías usar map así:
      // map(response => ({ posts: response }))
      // Pero como jsonplaceholder devuelve un array, simplemente lo devolvemos.
      map((response) => ({ posts: response }))
    );
  }

  getPostDetail(id: number): Observable<PostsInterfaces> {
    const url = `<span class="math-inline">\{this\.API\_URL\}/</span>{id}`;
    return this.httpClient.get<PostsInterfaces>(url);
  }
}
