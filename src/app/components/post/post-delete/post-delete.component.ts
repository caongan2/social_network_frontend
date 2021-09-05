import {Component, OnInit} from '@angular/core';
import {PostService} from "../../../services/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrls: ['./post-delete.component.css']
})
export class PostDeleteComponent implements OnInit {
  post:any;
  constructor(private postService: PostService,
              private router: Router,
              private act:ActivatedRoute) { }

  // @ts-ignore
  id = +this.act.snapshot.paramMap.get('id');
  ngOnInit(): void {
  this.getPost();
  }

  getPost(){
    console.log(this.id)
    this.postService.getPostById(this.id).subscribe(res => {
      this.post = res;
      console.log(res);
    })
  }

}
