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

  private selectedPostIdSource = new BehaviorSubject<number | null>(null); //el observable guarda el id 
  selectedPostId = this.selectedPostIdSource.asObservable();

  setSelectedPostId(id: number) {
    this.selectedPostIdSource.next(id);
  }

  getSelectedPostId() {
    return this.selectedPostIdSource.getValue();
    //Este método devuelve el valor actual almacenado en el BehaviorSubject selectedPostIdSource utilizando getValue(),
    //Esto permite obtener el ID del post seleccionado y lo envia a posts detalle component para usarlo
  }

  getPosts(): Observable<any> {
    //hace la peticion a la api para obtener una lista de posts
    return this.httpClient
      .get<any>(this.API_URL)
      .pipe(map((response) => ({ posts: response })));
  }

  // getPostDetail(id: number): Observable<PostsInterfaces> {
  //   //hace la peticion a la api especificando q quiere un posts por id(individualmente)
  //   const url = `${this.API_URL}/${id}`;
  //   return this.httpClient.get<PostsInterfaces>(url);
  // }
}
