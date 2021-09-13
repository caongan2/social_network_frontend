import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {PostService} from "../../../services/post.service";
import {ActivatedRoute} from "@angular/router";

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
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getUser(this.id);
    this.getPostByUser();
  }

  getPostByUser(){
    return this.postService.getPostByUser(this.id).subscribe(res => {
      this.posts = res;
      console.log(res);
    })
  }

  getUser(id:number){
    return this.userService.getById(id).subscribe(res=>{
      this.user = res;
    })
  }

}
