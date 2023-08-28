import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ICategory } from '@shared/models_config_interface/category.interface';
import { IUser } from '@shared/models_config_interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceLayoutService {

  constructor(private httpClient: HttpClient) {}

  getCategory(): Observable<ICategory[]> {
    return this.httpClient.get<ICategory[]>('http://localhost:3000/category')
    .pipe(
      catchError( error => {
        console.log('error', error);
        throw error;
      })
    )
  }

  getUserProfile(id: number): Observable<IUser[]> {
    return this.httpClient.get<IUser[]>(`http://localhost:3000/user/${id}`)
      .pipe(
        catchError( error => {
          console.log('error', error);
          throw error;
        })
      )
  }
}
