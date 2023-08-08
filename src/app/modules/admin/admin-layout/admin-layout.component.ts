import { AsyncPipe, DatePipe, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminFooterComponent } from "@view-ui/admin-footer/admin-footer.component";
import { AdminHeaderComponent } from "@view-ui/admin-header/admin-header.component";
import { AdminNavBlockComponent } from "@view-ui/admin-nav-block/admin-nav-block.component";
import { INestedTreeNodes } from '@view-ui/admin-nav-block/models/nested-tree-node';
import { Observable, of } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { initMenu } from '../store/admin-menu-store/store/admin-menu.actions';
import { getMenuData } from '../store/admin-menu-store/store/admin-menu.selectors';

@Component({
    selector: 'app-admin-layout',
    standalone: true,
    templateUrl: './admin-layout.component.html',
    styleUrls: ['./admin-layout.component.scss'],
    imports: [RouterOutlet, DatePipe, AdminFooterComponent, AdminHeaderComponent, AdminNavBlockComponent, AsyncPipe, NgIf],
})
export class AdminLayoutComponent implements OnInit{
    private store$ = inject(Store);
    menuDate$: Observable<INestedTreeNodes[]> = this.store$.pipe(select(getMenuData));

    ngOnInit(): void {
        this.store$.dispatch(initMenu());
    }
}
