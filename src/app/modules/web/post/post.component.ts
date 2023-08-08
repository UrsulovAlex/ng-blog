import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IPostSingle } from '@shared/models_config_interface/post.interface';
import { CommentsComponent } from '@view-ui/web-comment/comments.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, CommentsComponent, NgIf, NgFor],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit{
  private activateRoute = inject(ActivatedRoute);
  postData!: IPostSingle;

  ngOnInit(): void {
    this.postData = this.activateRoute.snapshot.data['data'];
  }

}
