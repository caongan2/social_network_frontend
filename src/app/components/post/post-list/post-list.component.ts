import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {PostService} from "../../../services/post.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: any = [];
  user:any;
  constructor(private postService: PostService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(<string>this.authService.getUser());
    this.getAll();
    this.user = JSON.parse(<string>this.authService.getUser())
  }

  getAll() {
    return this.postService.getAll().subscribe(res => {
      this.posts = res;
    });
  }
}
