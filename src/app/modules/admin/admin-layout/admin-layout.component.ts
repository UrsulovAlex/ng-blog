import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminFooterComponent } from "@view-ui/admin-footer/admin-footer.component";
import { AdminHeaderComponent } from "@view-ui/admin-header/admin-header.component";
import { AdminNavBlockComponent } from "@view-ui/admin-nav-block/admin-nav-block.component";
import { INestedTreeNodes } from '@view-ui/admin-nav-block/models/nested-tree-node';
import { Observable, filter, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { initMenu } from '../store/admin-menu-store/store/admin-menu.actions';
import { getMenuData } from '../store/admin-menu-store/store/admin-menu.selectors';
import { LoadingService } from '@shared/services/loading.service';
import { LoadingComponent } from '@shared/components/loading/loading.component';

@Component({
    selector: 'app-admin-layout',
    standalone: true,
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.scss'],
    imports: [RouterOutlet, DatePipe, AdminFooterComponent, AdminHeaderComponent, AdminNavBlockComponent, AsyncPipe, NgIf, LoadingComponent],
})
export class AdminLayoutComponent implements OnInit{
    private store$ = inject(Store);
    menuDate$: Observable<INestedTreeNodes[]> = this.store$.pipe(select(getMenuData));
    loadingService = inject(LoadingService);

    ngOnInit(): void {
        this.store$.dispatch(initMenu());
    }
}
