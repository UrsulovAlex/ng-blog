import { inject } from '@angular/core';
import {
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ResolveFn
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PostService } from '../services/post.service';
import { IPostSingle } from '@shared/models_config_interface/post.interface';

export const PostResolver: ResolveFn<any> = ( 
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot,
  postService: PostService = inject(PostService),
  ): Observable<IPostSingle> => {
    const routId = route.paramMap.get('id');
    return postService.getPostById(Number(routId));
}
