import { Component, OnInit } from '@angular/core';
import {PostService} from "../../../services/post.service";
import {CommentService} from "../../../services/comment.service";
import {AuthService} from "../../../services/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  user: any
  formUpdate: FormGroup | undefined
  constructor(private authService: AuthService,
              private commentService: CommentService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  // @ts-ignore
  id = +this.activatedRoute.snapshot.paramMap.get('id')
  ngOnInit(): void {
    this.user = JSON.parse(<string>this.authService.getUser())
    this.commentService.getCommentById(this.id).subscribe(res => {
      this.formUpdate = this.fb.group({
        content: [res.content]
      })
    })
  }


  submitUpdate() {
    let data = this.formUpdate?.value
    return this.commentService.updateComment(data, this.id).subscribe(res => {
      this.router.navigate(['admin/home/posts']);
    })
  }



}
