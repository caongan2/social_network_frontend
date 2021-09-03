import { Component, OnInit } from '@angular/core';
import {PostService} from "../../../services/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.css']
})
export class PostDeleteComponent implements OnInit {
  post:any;
  constructor(private postService: PostService,
              private router: Router,
              private act:ActivatedRoute,
              private toastr:ToastrService) { }

  // @ts-ignore
  id = +this.act.snapshot.paramMap.get('id');
  ngOnInit(): void {
  this.getPost();
  }

  getPost(){
    this.postService.getPostById(this.id).subscribe(res => {
      this.post = res;
    })
  }

  deletePost(){
    if (confirm('Are you sure?')){
      this.postService.delete(this.id).subscribe(res => {
        this.toastr.success('Delete Post successfully','Delete Post');
        this.router.navigate(['admin/home/posts']);
      })
    }
  }

}
