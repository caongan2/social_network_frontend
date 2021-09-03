import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {PostService} from "../../../services/post.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: any = [];

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    return this.postService.getAll().subscribe(res => {
      this.posts = res;
    });
  }


  submit(event:any){
    let data = event.target?.value;
    this.postService.create(data).subscribe(res => {
      console.log(res);
    })
  }
}
