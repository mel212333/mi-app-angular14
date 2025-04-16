import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostsInterfaces } from '../../interfaces/posts.interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  // se usa @Injectable en lugar de @Component
  providedIn: 'root', // Esto hace que el servicio esté disponible en toda la aplicación
})
export class PostsserviesComponent {
  // API_URL: string = 'https://jsonplaceholder.typicode.com/todos/';
  private API_URL: string = environment.API_URL;
  
  constructor(private httpClient: HttpClient) {}

  private selectedPostIdSource = new BehaviorSubject<number | null>(null);
  selectedPostId = this.selectedPostIdSource.asObservable();

  setSelectedPostId(id: number) {
    this.selectedPostIdSource.next(id);
  }

  getSelectedPostId() {
    return this.selectedPostIdSource.getValue();
  }

  getPosts(): Observable<any> {
    return this.httpClient.get<any>(this.API_URL).pipe(
      // Si la API devolviera un objeto con una propiedad "posts", podrías usar map así:
      // map(response => ({ posts: response }))
      // Pero como jsonplaceholder devuelve un array, simplemente lo devolvemos.
      map((response) => ({ posts: response }))
    );
  }

  getPostDetail(id: number): Observable<PostsInterfaces> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.get<PostsInterfaces>(url);
  }
}
