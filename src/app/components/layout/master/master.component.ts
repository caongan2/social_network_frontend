import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
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

  submit(event:any){
   let data = event.target?.value;
    this.postService.create(data).subscribe(res => {
      console.log(res);
    })
  }

}
