import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-section-left',
  templateUrl: './section-left.component.html',
  styleUrls: ['./section-left.component.css']
})
export class SectionLeftComponent implements OnInit {
  user:any;
  users:any = [];
  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private toastr: ToastrService) { }

  // @ts-ignore
  id =+ this.activatedRoute.snapshot.paramMap.get('id');
  ngOnInit(): void {
    this.user = JSON.parse(<string>this.authService.getUser());
    this.listUsers();
  }

  listUsers(){
    return this.userService.listUsers().subscribe(res=>{
      this.users = res;
    })
  }

  addFriend(id:number){
    return this.userService.addFriend(id).subscribe(res=>{
      console.log(res)
      this.refresh();
      this.toastr.success('Send a friend request successfully')
    })
  }

  refresh(): void {
    window.location.reload();
  }

}
