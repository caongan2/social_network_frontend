import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {PostService} from "../../../services/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {CommentService} from "../../../services/comment.service";

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.css']
})
export class PersonalPageComponent implements OnInit {
  posts:any = [];
  user :any;
  // @ts-ignore
  id = +this.activatedRoute.snapshot.paramMap.get('id');
  constructor(private userService: UserService,
              private postService:PostService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
              private toastr: ToastrService,
              private commentService: CommentService) { }

  ngOnInit(): void {
    this.getUser(this.id);
    this.getPostByUser();
  }

  getPostByUser(){
    return this.postService.getPostByUser(this.id).subscribe(posts => {
      for (const post of posts) {
        post.propertyLike = false;
        post.showComment = true
        this.postService.getCountLikeByPost(post.id).subscribe(likes=>{
          post['like'] = likes;
          this.commentService.getCommentByPost(post.id).subscribe(comments => {
            post['comment'] = comments
            this.posts.push(post)
          })
        });
      }
    })
  }


  like(id: any) {
    this.postService.like(id).subscribe(res => {
      // @ts-ignore
      document.getElementById('countLike-' + id ).innerHTML = res;
    })
  }

  getUser(id:number){
    return this.userService.getById(id).subscribe(res=>{
      this.user = res;
    })
  }

}
