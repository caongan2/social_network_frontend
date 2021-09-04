import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../../../services/post.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  formCreatePost?: FormGroup;
  user: any;
  is_public: boolean = true;
  posts: any = [];

  constructor(private postService: PostService,
              private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(<string>this.authService.getUser());
    this.formCreatePost = this.fb.group({
      userId: [this.user.id],
      content: ['', [Validators.required]],
      is_public: ['',[Validators.required]],
    });
    this.getAll();
  }

  getAll() {
    return this.postService.getAll().subscribe(res => {
      this.posts = res;
    });
  }

  submit() {
    let data = this.formCreatePost?.value;
    return this.postService.create(data).subscribe(res => {
       this.toastr.success('Create Post successfully','Create Post');
       this.getAll();
       this.refresh();
    })

  }

  get content() {
    return this.formCreatePost?.get('content');
  }

  get isPublic(){
    return this.formCreatePost?.get('is_public');
  }

  refresh(): void {
    window.location.reload();
  }


}
