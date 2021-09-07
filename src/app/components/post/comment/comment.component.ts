import { Component, OnInit } from '@angular/core';
import {PostService} from "../../../services/post.service";
import {CommentService} from "../../../services/comment.service";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  posts: any[] = []
  constructor(private postService: PostService,
              private commentService: CommentService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    return this.postService.getAll().subscribe(response => {
      for (const post of response) {
        this.commentService.getCommentByPost(post.id).subscribe(comments => {
          post['comment'] = comments
          this.posts.push(post)
          console.log(this.posts)
        })
      }
    })
  }

}
