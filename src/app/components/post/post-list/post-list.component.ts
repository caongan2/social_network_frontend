import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {PostService} from "../../../services/post.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: any = [];
  user:any;
  constructor(private postService: PostService,
              private authService: AuthService,
              private router:Router,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {

    this.user = JSON.parse(<string>this.authService.getUser());
    this.getAll();
  }

  getAll() {
    return this.postService.getAll().subscribe(res => {
      this.posts = res;
    });
  }

  deletePost(id:number){
      this.postService.delete(id).subscribe(res => {
        this.toastr.success('Delete Post successfully','Delete Post');
        this.getAll();
        this.router.navigate(['admin/home/posts']);
      })

  }
}
