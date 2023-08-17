import { NgIf, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { IPostStateData } from '@shared/components/post-state/state/models/post-state';
import { PostComponentStore } from '@shared/components/post-state/state/post-component-store';
import { PAGINATOR_PAGE_SIZE_OPTIONS } from '@shared/models_config_interface/pagination.interface';
import { IParams } from '@shared/models_config_interface/params.interface';
import { DEFAULT_STORE_PARAMS } from '@shared/models_config_interface/post-params-store.config';
import { IPost } from '@shared/models_config_interface/post.interface';
import { DestroyService } from '@shared/services/destroy.service';
import { PostListComponent } from '@view-ui/post-list/post-list.component';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-web-home',
  templateUrl: './web-home.component.html',
  styleUrls: ['./web-home.component.scss'],
  standalone: true,
  imports: [
    MatPaginatorModule,
    NgIf,
    NgFor,
    PostListComponent,
  ],
  providers: [DestroyService],
})
export class WebHomeComponent implements OnInit{
  private postComponentStore$ = inject(PostComponentStore);
  private destroyService$ = inject(DestroyService);
  postStateData$ = this.postComponentStore$.postState$;
  posts: IPost[] = [];
  showFirstLastButtons = true;
  pageSizeOptions = PAGINATOR_PAGE_SIZE_OPTIONS;
  paginatorOptionsData!: Partial<IParams>;
  pageIndex = 0;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.initData();
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.postComponentStore$.checkGlobalParams({ page: event.pageIndex + 1, per_page: event.pageSize });
  }

  initData(): void {
    this.postComponentStore$.getPosts$(DEFAULT_STORE_PARAMS);
    this.postStateData$.pipe(
      takeUntil(this.destroyService$),
    ).subscribe((data: IPostStateData) => {
      this.paginatorOptionsData = data.currentParams;
      this.posts = data.postStateData[data.currentDataIndex]?.data;
    });
  }

  trackByFn(index: number, item: IPost) {
    return index;
  }

}
