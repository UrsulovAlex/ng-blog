import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { ICategory } from '@shared/models_config_interface/category.interface';
import { IUser } from '@shared/models_config_interface/user.interface';
import { IParams } from '@shared/models_config_interface/params.interface';
import { IPostResponse } from '@shared/models_config_interface/post.interface';
import { validateQueryParams } from '@shared/helpers/validateQueryParams';

@Injectable({
  providedIn: 'root'
})
export class ServiceLayoutService {

  constructor(private httpClient: HttpClient) {}

  getCategory(): Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>('http://localhost:3000/category')
  }

  getAllPosts(params: Partial<IParams>): Observable<IPostResponse> {
    return this.httpClient.get<IPostResponse>('http://localhost:3000/post', { params: validateQueryParams(params)});
  }

  getUserProfile(id: number): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(`http://localhost:3000/user/${id}`)
  }
}
