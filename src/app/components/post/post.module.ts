import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCreateComponent } from './post-create/post-create.component';



@NgModule({
  declarations: [
    PostCreateComponent
  ],
  exports: [
    PostCreateComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PostModule { }
