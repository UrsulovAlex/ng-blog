import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { validateQueryParams } from '@shared/helpers/validateQueryParams';
import { IParams } from '@shared/models_config_interface/params.interface';
import { IPostResponse, IPostSingle } from '@shared/models_config_interface/post.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient) { }

  getAllPosts(params: Partial<IParams>): Observable<IPostResponse> {
    return this.httpClient.get<IPostResponse>('http://localhost:3000/post', { params: validateQueryParams(params)});
  }

  getPostById(id: number): Observable<IPostSingle> {
    return this.httpClient.get<IPostSingle>(`http://localhost:3000/post/${id}`);
  }
}
