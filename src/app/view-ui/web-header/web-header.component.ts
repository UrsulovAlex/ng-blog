import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
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
import { ThemeManagerService } from '@shared/services/theme-manager.service';

@Component({
  standalone: true,
  selector: 'app-web-header',
  templateUrl: './web-header.component.html',
  styleUrls: ['./web-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, RouterModule, StopEventDirective, NgIf],
  providers: [ThemeManagerService],
})
export class WebHeaderComponent {
  @Input() user: any;
  private store$ = inject(Store);
  private themeManagerService = inject(ThemeManagerService);
  userRole = Roles;
  themeToggle = this.themeManagerService.secondTheme;

  onLogaout(): void {
    this.store$.dispatch(logout());
  }

  toggleTheme() {
    this.themeManagerService.toggleTheme();
    this.themeToggle = !this.themeToggle;
  }
}
