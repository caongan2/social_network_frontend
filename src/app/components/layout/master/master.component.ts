import { Component, OnInit } from '@angular/core';
import {PostService} from "../../../services/post.service";


@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

}
