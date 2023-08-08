import { inject } from '@angular/core';
import { CanActivateFn, Router  } from '@angular/router';
import { Observable, first, map} from 'rxjs';
import { AuthService } from '../modules/auth/admin-auth-store/store/services/auth.service';


export const AdminGuard:CanActivateFn = () => {
  return getIsAuth();
}

function getIsAuth(): Observable<boolean> {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.isAuth$.pipe(
    first(),
    map(isAuth => {
      if(!isAuth) {
        router.navigate(['/home'])
      }
      return isAuth;
    }),
  );
}

