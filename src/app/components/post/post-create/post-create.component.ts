import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../../../services/post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  formCreatePost?:FormGroup;
  constructor(private postService: PostService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.formCreatePost = this.fb.group({
      content:['',[Validators.required]]
    })
  }

  submit(){
    let data = this.formCreatePost?.value;
    return this.postService.create(data).subscribe(res => {
      this.router.navigate(['admin/home']);
    })
  }

  get content(){
    return this.formCreatePost?.get('content');
  }

}
