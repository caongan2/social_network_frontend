import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-profile-banner',
  templateUrl: './user-profile-banner.component.html',
  styleUrls: ['./user-profile-banner.component.css']
})
export class UserProfileBannerComponent implements OnInit {

  user: any;
  // @ts-ignore
  id = +this.activatedRoute.snapshot.paramMap.get('id');
  constructor(private userService: UserService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.user = JSON.parse(<string>this.authService.getUser())
    this.getUser(this.id)
  }

  getUser(id:number){
    return this.userService.getById(id).subscribe(res=>{
      this.user = res;
    })
  }
}
