import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPostResponse, IPostSingle } from '@shared/models_config_interface/post.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) {}

  getPostById(id: number): Observable<IPostSingle> {
    return this.httpClient.get<IPostSingle>(`http://localhost:3000/post/${id}`);
  }
}
