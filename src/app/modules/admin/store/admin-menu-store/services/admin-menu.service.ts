import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INestedTreeNodes } from '@view-ui/admin-nav-block/models/nested-tree-node';

@Injectable({
  providedIn: 'root'
})
export class AdminMenuService {

  constructor(private httpClient: HttpClient) { }

  getMenu(): Observable<INestedTreeNodes[]> {
    return this.httpClient.get<INestedTreeNodes[]>('http://localhost:3000/menu');
  }
}
