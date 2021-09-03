import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../../../services/post.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  @Output() status = new EventEmitter<string>();
  formCreatePost?: FormGroup;
  user: any;
  is_public: boolean = true;

  constructor(private postService: PostService,
              private fb: FormBuilder,
              private router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(<string>this.authService.getUser());
    this.formCreatePost = this.fb.group({
      user_id: [this.user.id],
      content: ['', [Validators.required]],
      is_public: ['', [Validators.required]],
    })
  }

  submit() {
    let data = this.formCreatePost?.value;
    return this.postService.create(data).subscribe(res => {
      this.router.navigate(['admin/home']);
    })
  }

  get content() {
    return this.formCreatePost?.get('content');
  }


  getStatus(value: any) {
    value = this.formCreatePost?.value;
    console.log(value);
  }

}
