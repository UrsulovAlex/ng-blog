import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoad$ = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoad$.asObservable();

  toggleLoading(val: boolean) {
    this.isLoad$.next(val);
  }
}
