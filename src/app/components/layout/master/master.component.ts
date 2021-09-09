import { Component, OnInit } from '@angular/core';
import {PostService} from "../../../services/post.service";
import {UserService} from "../../../services/user.service";


@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  users:any = [];
  userFilter:any = [];
  constructor(private postService: PostService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.getAll();
    this.userFilter = this.users;
  }

  getAll(){
    this.userService.getAll().subscribe(res => {
      this.users = res;
    })
  }

  searchUser(event:any){
   let name = event;
    this.userFilter = this.findUser(name);
  }

  findUser(keyword:any){
    return this.users.filter((user: { name: string; }) =>{
      return user.name.toLowerCase().indexOf(keyword) !=-1;
    });

  }

}
