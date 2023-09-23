import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { validateQueryParams } from '@shared/helpers/validateQueryParams';
import { IParams } from '@shared/models_config_interface/params.interface';
import { IPostResponse, IPostSingle, IManipulatePost } from '@shared/models_config_interface/post.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private currentUrl = 'http://localhost:3000/post';

  constructor(private httpClient: HttpClient) { }

  getAllPosts(params: Partial<IParams>): Observable<IPostResponse> {
    return this.httpClient.get<IPostResponse>(this.currentUrl, { params: validateQueryParams(params)});
  }

  getPostById(id: number): Observable<IPostSingle> {
    return this.httpClient.get<IPostSingle>(`${this.currentUrl}/${id}`);
  }

  updatePost(id: number, body: IManipulatePost): Observable<IPostSingle>{
    return this.httpClient.put<IPostSingle>(`${this.currentUrl}/update/${id}`, body);
  }

  createPost(body: IManipulatePost): Observable<IPostSingle> {
    return this.httpClient.post<IPostSingle>(`${this.currentUrl}/create`, body);
  }
  
  removePost(id: number){
    return this.httpClient.delete(`${this.currentUrl}/delete/${id}`);
  }
}
