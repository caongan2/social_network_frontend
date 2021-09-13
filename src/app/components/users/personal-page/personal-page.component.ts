import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {PostService} from "../../../services/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {ToastrService} from "ngx-toastr";

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
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUser(this.id);
    this.getPostByUser();
  }

  getPostByUser(){
    return this.postService.getPostByUser(this.id).subscribe(res => {
      console.log(res)
      this.posts = res;
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
