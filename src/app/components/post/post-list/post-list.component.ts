import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {PostService} from "../../../services/post.service";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {count} from "rxjs/operators";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: any = [];
  user:any;
  isLike:boolean = false;
  constructor(private postService: PostService,
              private authService: AuthService,
              private router:Router,
              private toastr: ToastrService,
              private activatedRoute: ActivatedRoute) {}
  // @ts-ignore
  id = +this.activatedRoute.snapshot.paramMap.get('id');
  ngOnInit(): void {
    this.user = JSON.parse(<string>this.authService.getUser());
    this.getAll();
  }

  getAll() {
    return this.postService.getAll().subscribe(posts => {
      for (const post of posts) {
        post.propertyLike = false;
        this.postService.getCountLikeByPost(post.id).subscribe(likes=>{
          post['like'] = likes;
          this.posts.push(post);
        })
      }
      console.log(posts);
    });
  }

  deletePost(id:number){
    if(confirm('Are you sure?')){
      this.postService.delete(id).subscribe(res => {
        this.toastr.success('Delete Post successfully','Delete Post');
        this.getAll();
        this.router.navigate(['admin/home/posts']);
      })
    }
  }

  like(id:any){
    this.postService.like(id).subscribe(res=>{
      for (const post of this.posts) {
        if(post.id === id) {
          post.propertyLike = !post.propertyLike
          post['like'].length += 1;
        }
      }
      this.router.navigate(['admin/home/posts']);
    })
  }

  dislike(id:any){
    this.postService.disLike(id).subscribe(res=>{
      for (const post of this.posts) {
        if(post.id === id) {
          post.propertyLike = !post.propertyLike
          post['like'].length -= 1;
        }
      }
      this.router.navigate(['admin/home/posts']);
    });
  }

}
