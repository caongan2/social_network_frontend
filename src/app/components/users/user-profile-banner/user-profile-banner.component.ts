import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-profile-banner',
  templateUrl: './user-profile-banner.component.html',
  styleUrls: ['./user-profile-banner.component.css']
})
export class UserProfileBannerComponent implements OnInit {
  is_accept:any = true;
  user: any;
  userLogin: any
  // @ts-ignore
  id = +this.activatedRoute.snapshot.paramMap.get('id');
  constructor(private userService: UserService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userLogin = JSON.parse(<string>this.authService.getUser())
    this.getUser(this.id)
    this.getIsAccept();
  }

  getUser(id:number){
    return this.userService.getById(id).subscribe(res=>{
      this.user = res;
    })
  }

  addFriend(id:number){
    return this.userService.addFriend(id).subscribe(res=>{
      this.toastr.success('Added request friend successfully');
    })
  }

  getIsAccept(){
    return this.userService.getRelationShip(this.id).subscribe(res=>{
      this.is_accept = res;
    })
  }



}
