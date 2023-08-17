import { Component, OnInit, inject } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { IPostStateData } from '@shared/components/post-state/state/models/post-state';
import { PostComponentStore } from '@shared/components/post-state/state/post-component-store';
import { PAGINATOR_PAGE_SIZE_OPTIONS } from '@shared/models_config_interface/pagination.interface';
import { IParams } from '@shared/models_config_interface/params.interface';
import { DEFAULT_STORE_PARAMS } from '@shared/models_config_interface/post-params-store.config';
import { DestroyService } from '@shared/services/destroy.service';
import { takeUntil } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IPost } from '@shared/models_config_interface/post.interface';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  providers: [DestroyService],
  imports: [ MatTableModule, MatPaginatorModule, DatePipe, MatIconModule, MatButtonModule],
})
export class AdminDashboardComponent implements OnInit{
  private postComponentStore$ = inject(PostComponentStore);
  private destroyService$ = inject(DestroyService);
  postStateData$ = this.postComponentStore$.postState$;
  posts: IPost[] = [];
  showFirstLastButtons = true;
  pageSizeOptions = PAGINATOR_PAGE_SIZE_OPTIONS;
  paginatorOptionsData!: Partial<IParams>;
  pageIndex = 0;
  displayedColumns: string[] = ['Title', 'Category', 'Autor', 'Create', 'Update', 'Action'];

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
