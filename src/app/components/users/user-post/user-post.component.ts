import { Component, OnInit } from '@angular/core';
import {PostService} from "../../../services/post.service";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.css']
})
export class UserPostComponent implements OnInit {

  // @ts-ignore
  id = +this.activatedRoute.snapshot.paramMap.get('id');
  user:any;
  posts: any = [];
  constructor(private postService:PostService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = JSON.parse(<string>this.authService.getUser());
    this.getPostByUser();
  }

  getPostByUser() {
    return this.postService.getPostByUser(this.id).subscribe(res => {
      this.posts = res;
    })
  }
}
