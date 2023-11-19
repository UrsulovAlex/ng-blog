import { Component, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IManipulatePost, IPostSingle } from '@shared/models_config_interface/post.interface';
import { AdminPostConType } from './admin-post.config';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { InputFormComponent } from '@view-ui/elements/input-form/input-form.component';
import { TextareaComponent } from '@view-ui/elements/textarea/textarea.component';
import { Store, select } from '@ngrx/store';
import { ICategory } from '@shared/models_config_interface/category.interface';
import { getCategoryData } from '@modules/web/web-layout/store/category-store/category.selectors';
import { Observable, catchError, debounceTime, distinctUntilChanged, take, takeUntil, tap } from 'rxjs';
import { SelectComponent } from '@view-ui/elements/select/select.component';
import { PostService } from '@shared/services/post.service';
import { DestroyService } from '@shared/services/destroy.service';
import { getAuthData } from '@shared/modules/auth/admin-auth-store/store/admin-auth.selectors';
import { AuthData } from '@shared/modules/auth/admin-auth-store/store/admin-auth.reducer';
import { PostComponentStore } from '@shared/components/post-state/state/post-component-store';
import { ENUM_FORM_GROUP } from '@shared/enum/formGroup.enem';

@Component({
    selector: 'app-admin-post',
    standalone: true,
    templateUrl: './admin-post.component.html',
    styleUrls: ['./admin-post.component.scss'],
    imports: [CommonModule, ReactiveFormsModule, InputFormComponent, MatButtonModule, MatCardModule, TextareaComponent, SelectComponent, AsyncPipe],
    providers: [DestroyService],
})
export class AdminPostComponent {
  private formBuilder = inject(FormBuilder);
  private activateRoute = inject(ActivatedRoute);
  private store$ = inject(Store);  
  private destroyService$ = inject(DestroyService);
  private postService = inject(PostService);
  private postComponentStore$ = inject(PostComponentStore);
  private userId$: Observable<AuthData | null> = this.store$.pipe(
    select(getAuthData)
  );
  private userId: number = 0;
  postData!: IPostSingle;
  commponentType: AdminPostConType = 'update';
  formGroup!:FormGroup;
  categoryInit$: Observable<ICategory[]> = this.store$.pipe(
    select(getCategoryData)
  );
  disabledButton = false;
  currentFormGroup: ENUM_FORM_GROUP = ENUM_FORM_GROUP.post_edit;

  ngOnInit(): void {
    this.initData();
    this.initForm();
  }

  initData(): void {
    this.postData = this.activateRoute.snapshot.data['dataPost'];
    this.commponentType = this.activateRoute.snapshot.data['type'];
    this.userId$.pipe(
      take(1),
    ).subscribe( data =>  {
        if(data) {
          this.userId = data.id
        }
      }
    );
  }

  initForm(): void {
    this.formGroup = this.formBuilder.group({
      nameCategory: [ null, [Validators.required]],
      title: [ null, [Validators.required, Validators.minLength(2)]],
      text: [ null, [Validators.required, Validators.minLength(5)]],
    })
    if (this.commponentType === 'update') {
      this.formGroup.setValue({
        nameCategory: this.postData.nameCategory?.id,
        title: this.postData.title,
        text: this.postData.text,
      });
    }

    this.formGroup.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      takeUntil(this.destroyService$),
    ).subscribe(event => {
      if(event) {
        this.disabledButton = true;
      }
    });
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      const payload: IManipulatePost = {
        title: this.formGroup.get('title')?.value,
        text: this.formGroup.get('text')?.value,
        authorPostsId: this.userId,
        categoryId: this.formGroup.get('nameCategory')?.value,
      }
      if (this.commponentType === 'update') {
        this.postService.updatePost(this.postData.id, payload).pipe(
          tap( () => {
            const upadatePostState: IPostSingle = {
              ...this.postData,
              ...payload
            }
            this.postComponentStore$.updatePostState(upadatePostState);
          }),
          take(1)
        ).subscribe( data =>  {
          this.postData = data;
          this.disabledButton = false;
        });
      } else {
        this.postService.createPost(payload).pipe(
          take(1)
        ).subscribe(data => {
          this.disabledButton = false;
        })
      }
    }
  }
}
