import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { TruncatePipe } from '@shared/pipes/truncate.pipe';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, NgIf, MatButtonModule, TruncatePipe],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent {
  @Input() data: any;
  private router = inject(Router);

  showPost(): void {
    this.router.navigate(['/post', this.data.id]);
  }
}
