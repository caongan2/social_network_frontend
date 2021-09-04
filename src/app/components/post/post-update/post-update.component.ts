import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../../../services/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.css']
})
export class PostUpdateComponent implements OnInit {
  formUpdate?: FormGroup;
  user:any;
  is_public:boolean = true;

  constructor(private postService: PostService,
              private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService) { }

  // @ts-ignore
  id = +this.activatedRoute.snapshot.paramMap.get('id');
  ngOnInit(): void {
    this.user = JSON.parse(<string>this.authService.getUser());
    this.postService.getPostById(this.id).subscribe(res => {
      this.formUpdate = this.fb.group({
        content:[res.content,[Validators.required]],
        is_public:[res.is_public,[Validators.required]]
      })
    })

  }

  submit() {
    let data = this.formUpdate?.value;
    return this.postService.update(data,this.id).subscribe(res => {
      this.toastr.success('Update Post successfully','Update Post');
      this.router.navigate(['admin/home/posts']);
    })
  }

  get content() {
    return this.formUpdate?.get('content');
  }

  get isPublic(){
    return this.formUpdate?.get('is_public');
  }

}
