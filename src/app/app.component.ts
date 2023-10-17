import { Component, OnInit } from '@angular/core';
import { provideComponentStore } from '@ngrx/component-store';
import { PostComponentStore } from '@shared/components/post-state/state/post-component-store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    provideComponentStore(PostComponentStore)
  ],
})
export class AppComponent implements OnInit{
  private initData = this.postComponentStore.getPosts$

  constructor(private postComponentStore: PostComponentStore) {

  }

  ngOnInit(): void {
    
  }
}
