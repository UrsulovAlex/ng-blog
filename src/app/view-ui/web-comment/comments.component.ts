import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { IPostComments } from '@shared/models_config_interface/post.interface';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CommonModule, MatCardModule, NgIf, MatButtonModule],
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent {
  @Input() data!: IPostComments;
}
