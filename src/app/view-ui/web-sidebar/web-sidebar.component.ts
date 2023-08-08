import { NgFor, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatBadgeModule} from '@angular/material/badge';
import { ICategory } from '../../shared/models_config_interface/category.interface';

@Component({
  standalone: true,
  selector: 'app-web-sidebar',
  templateUrl: './web-sidebar.component.html',
  styleUrls: ['./web-sidebar.component.scss'],
  imports: [MatListModule, NgFor, MatIconModule, MatDividerModule, DatePipe, MatBadgeModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WebSidebarComponent {
  @Input() data: ICategory[] | null = [];
}
