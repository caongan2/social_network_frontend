import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-sidebar-right',
  templateUrl: './sidebar-right.component.html',
  styleUrls: ['./sidebar-right.component.css']
})
export class SidebarRightComponent implements OnInit {
  user:any;
  users:any = [];
  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private authService: AuthService) { }

  // @ts-ignore
  id =+ this.activatedRoute.snapshot.paramMap.get('id');
  ngOnInit(): void {
    this.user = JSON.parse(<string>this.authService.getUser());
    this.listFriend();
  }


  listFriend(){
    return this.userService.listFriend(this.user.id).subscribe(res=>{
      this.users = res;
    })
  }

}
