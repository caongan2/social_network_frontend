import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../../../services/post.service";
import {AuthService} from "../../../services/auth.service";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: any;
  posts: any = [];
  // @ts-ignore
  id = +this.activatedRoute.snapshot.paramMap.get('id');

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private postService: PostService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.user = JSON.parse(<string>this.authService.getUser());
    this.getPostByUser();
  }

  getPostByUser(){
    return this.postService.getPostByUser(this.id).subscribe(res => {
      this.posts = res;
    })
  }

}
