import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from '@shared/modules/auth/admin-auth-store/store/admin-auth.actions';
import { StopEventDirective } from '@shared/derectives/stopevent.directive';
import { Roles } from '@shared/enum/roles.enum';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-web-header',
  templateUrl: './web-header.component.html',
  styleUrls: ['./web-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, RouterModule, StopEventDirective, NgIf],
})
export class WebHeaderComponent {
  @Input() user: any;
  private store$ = inject(Store);
  userRole = Roles;

  onLogaout(): void {
    this.store$.dispatch(logout());
  }
}
