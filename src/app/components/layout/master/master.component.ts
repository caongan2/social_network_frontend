import { Component, OnInit } from '@angular/core';
import {PostService} from "../../../services/post.service";
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.css']
})
export class MasterComponent implements OnInit {
  user:any;
  users:any = [];
  userFilter:any = [];
  requestFriends:any = [];

  constructor(private postService: PostService,
              private authService: AuthService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) { }
  // @ts-ignore
  id =+ this.activatedRoute.snapshot.paramMap.get('id');
  ngOnInit(): void {
    this.user = JSON.parse(<string>this.authService.getUser());
    this.getAll();
    this.userFilter = this.users;
    this.requestFriends = this.users;
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

  requestFriend(event:any){
    let friend = event;
    return  this.userService.requestFriend(friend).subscribe(res=>{
      this.requestFriends = res;
    })
  }

  acceptRequest(id:number){
    return this.userService.acceptFriend(id).subscribe(res=>{
      this.requestFriends.splice(res);
      // this.refresh();
      this.toastr.success('You have accepted the friend request');
    })
  }

  deleteRequest(id:number){
    return this.userService.deleteRequest(id).subscribe(res=>{
      this.requestFriends.splice(res);
      this.toastr.info('You declined the friend request');
    })
  }

  refresh(): void {
    window.location.reload();
  }

}
