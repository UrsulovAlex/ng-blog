import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
  Scroll,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import {
  EMPTY,
  Observable,
  catchError,
  switchMap,
  takeUntil,
} from 'rxjs';
import { AuthData } from '@shared/modules/auth/admin-auth-store/store/admin-auth.reducer';
import { getAuthData } from '@shared/modules/auth/admin-auth-store/store/admin-auth.selectors';
import { PostListComponent } from '@view-ui/post-list/post-list.component';
import { WebFooterComponent } from '@view-ui/web-footer/web-footer.component';
import { WebHeaderComponent } from '@view-ui/web-header/web-header.component';
import { WebSidebarComponent } from '@view-ui/web-sidebar/web-sidebar.component';
import { ServiceLayoutService } from './store/services/service-layout.service';
import { IUser } from '@shared/models_config_interface/user.interface';
import { ICategory } from '@shared/models_config_interface/category.interface';
import { getCategoryData } from '@modules/web/web-layout/store/category-store/category.selectors';
import { PostComponentStore } from '@shared/components/post-state/state/post-component-store';
import { PageEvent } from '@angular/material/paginator';
import { DestroyService } from '@shared/services/destroy.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { LoadingService } from '@shared/services/loading.service';

@Component({
  selector: 'app-web-layout',
  templateUrl: './web-layout.component.html',
  styleUrls: ['./web-layout.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    WebSidebarComponent,
    WebHeaderComponent,
    WebFooterComponent,
    AsyncPipe,
    NgIf,
    NgFor,
    PostListComponent,
    NgClass,
    LoadingComponent,
  ],
  providers: [DestroyService]
})
export class WebLayoutComponent implements OnInit {
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private store$ = inject(Store);
  private serviceLayoutService = inject(ServiceLayoutService);
  private postComponentStore$ = inject(PostComponentStore);
  private destroyService$ = inject(DestroyService);
  loadingService = inject(LoadingService);
  showHeader = false;
  showSidebar = false;
  userInit$: Observable<AuthData | null> = this.store$.pipe(
    select(getAuthData)
  );
  categoryInit$: Observable<ICategory[]> = this.store$.pipe(
    select(getCategoryData)
  );
  data: IUser[] = [];
  

  ngOnInit(): void {
    this.initTemplate();
    this.initData();
  }

  initTemplate(): void {
    this.router.events.subscribe((data) => {
      if (data instanceof NavigationEnd || data instanceof Scroll) {
        this.showHeader = this.activatedRoute?.firstChild?.snapshot.data['showHeader'] !== false;
        this.showSidebar = this.activatedRoute?.firstChild?.snapshot.data['showSidebar'] !== false;
      }
    });
  }

  handlePageEvent(event: PageEvent): void {
    this.postComponentStore$.checkGlobalParams({ page: event.pageIndex + 1, per_page: event.pageSize });
  }

  initData(): void {
    this.userInit$.pipe(
      switchMap((isUserId: AuthData | null) => {
        if (isUserId) {
          return this.serviceLayoutService.getUserProfile(Number(isUserId.id));
        }
        return EMPTY;
      }),
      catchError((error) => error),
      takeUntil(this.destroyService$),
    );
  }
}
