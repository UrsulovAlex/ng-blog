import { inject } from '@angular/core';
import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  ResolveFn
} from '@angular/router';
import { Observable } from 'rxjs'; 
import { IPostSingle } from '@shared/models_config_interface/post.interface';
import { PostService } from '@shared/services/post.service';

export const PostResolver: ResolveFn<any> = ( 
  route: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot,
  postService: PostService = inject(PostService),
  ): Observable<IPostSingle> => {
    const routId = route.paramMap.get('id');
    return postService.getPostById(Number(routId));
}
