import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCreateComponent } from './post-create/post-create.component';
import {PostListComponent} from "./post-list/post-list.component";
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import { PostUpdateComponent } from './post-update/post-update.component';
import { PostDeleteComponent } from './post-delete/post-delete.component';

const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
    children:[
      {
        path: 'create',
        component: PostCreateComponent,
      }
    ]
  },
  {
    path: ':id/update',
    component: PostUpdateComponent,
  },
  {
    path: ':id/delete',
    component: PostDeleteComponent,
  }
]


@NgModule({
  declarations: [
    PostCreateComponent,
    PostListComponent,
    PostUpdateComponent,
    PostDeleteComponent
  ],
  exports: [
    PostCreateComponent,
    PostListComponent
  ],
  imports: [
    [RouterModule.forChild(routes)],
    CommonModule,
    ReactiveFormsModule
  ]
})
export class PostModule { }
