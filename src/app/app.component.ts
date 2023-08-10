import { Component, OnInit } from '@angular/core';
import { PostComponentStore } from '@shared/components/post-state/state/post-component-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PostComponentStore],
})
export class AppComponent implements OnInit{
  private initData = this.postComponentStore.getPosts$

  constructor(private postComponentStore: PostComponentStore) {

  }

  ngOnInit(): void {
    
  }
}
