import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {PostService} from "../../../services/post.service";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {CommentService} from "../../../services/comment.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  array: any = []
  posts: any = [];
  allComments = []
  user: any;
  isLike: boolean = false;
  formComment: FormGroup | undefined;
  post: any;
  showComment: boolean = false
  comments = []

  constructor(private postService: PostService,
              private authService: AuthService,
              private router: Router,
              private toastr: ToastrService,
              private activatedRoute: ActivatedRoute,
              private commentService: CommentService,
              private fb: FormBuilder) {
  }

  // @ts-ignore
  id = +this.activatedRoute.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.user = JSON.parse(<string>this.authService.getUser());
    this.getAll();
    this.formComment = this.fb.group({
      user_id: [this.user.id],
      content: ['']
    })
  }

  logPosts(data:any) {
    this.array = data
    // @ts-ignore
    console.log(this.array[0].length)
  }



  getAll() {
    return this.postService.getAll().subscribe(posts => {
      for (const post of posts) {
        post.propertyLike = false;
        post.showComment = true
        this.postService.getCountLikeByPost(post.id).subscribe(likes=>{
          post['like'] = likes;
          this.commentService.getCommentByPost(post.id).subscribe(comments => {
            this.allComments = comments
            post['comment'] = comments
            this.posts.push(post)
          })
        });
      }
    })
  }

  deletePost(id: number) {
    if (confirm('Are you sure?')) {
      this.postService.delete(id).subscribe(res => {
        // @ts-ignore
        document.getElementById('post-' + id ).remove();
        this.toastr.success('Delete Post successfully','Delete Post');
        // this.refresh();
      })
    }
  }

  deleteComment(id: number) {
    if (confirm('Are you sure?')) {
      this.commentService.delete(id).subscribe(res => {
        // @ts-ignore
        document.getElementById('comment-' + id ).remove();
      })
    }
  }

  like(id: any) {
    this.postService.like(id).subscribe(res => {
      // @ts-ignore
      document.getElementById('countLike-' + id ).innerHTML = res;
    })
  }

  // getCommentByPost(id: any) {
  //   return this.commentService.getCommentByPost({...id, post_id:id}).subscribe(res => {
  //     this.comments = res
  //   })
  // }

  submitComment(id: number) {

    let data = this.formComment?.value
    this.commentService.comment({...data, post_id:id}).subscribe(res => {
      this.getAll()
      this.refresh()
    })
  }

  refresh(): void {
    window.location.reload();
  }

  showMoreComment(id: number) {
    this.commentService.getCommentByPost(id).subscribe(res => {
      for (const post of this.posts) {
        if (post.id == id) {
          post.showComment = !post.showComment
        }
      }
    })
  }
}
