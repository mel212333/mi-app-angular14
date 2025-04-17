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

  getPostDetail(id: number): Observable<PostsInterfaces> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.get<PostsInterfaces>(url);
  }
}
