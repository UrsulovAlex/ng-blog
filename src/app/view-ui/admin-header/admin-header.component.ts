import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { logout } from '@shared/modules/auth/admin-auth-store/store/admin-auth.actions';


@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent {
  private store$ = inject(Store);

  onLogaout(): void {
    this.store$.dispatch(logout());
  }

}


