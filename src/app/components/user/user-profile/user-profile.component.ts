import { Component, OnInit } from '@angular/core';
import {PostService} from "../../../services/post.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  post:any = [];
  user:any;
  constructor(private postService: PostService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.user = JSON.parse(<string>this.authService.getUser());
    this.getPostByUser();
  }

  getPostByUser(){
    this.postService.getPostByUser(this.user['id']).subscribe(res => {
      this.post = res;
    })
  }

}
