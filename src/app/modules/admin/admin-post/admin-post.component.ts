import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IPostSingle } from '@shared/models_config_interface/post.interface';
import { AdminPostConType } from './admin-post.config';

@Component({
  selector: 'app-admin-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-post.component.html',
  styleUrls: ['./admin-post.component.scss']
})
export class AdminPostComponent {
  private activateRoute = inject(ActivatedRoute);
  postData!: IPostSingle;
  commponentType: AdminPostConType = 'update';

  ngOnInit(): void {
    this.postData = this.activateRoute.snapshot.data['dataPost'];
    this.commponentType = this.activateRoute.snapshot.data['type'];
  }

}
