import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute} from "@angular/router";
=======
>>>>>>> 9093ba2217a723abd4de619ba7690c79cda2ea7a

@Component({
  selector: 'app-user-profile-banner',
  templateUrl: './user-profile-banner.component.html',
  styleUrls: ['./user-profile-banner.component.css']
})
export class UserProfileBannerComponent implements OnInit {

<<<<<<< HEAD
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
=======
  constructor() { }

  ngOnInit(): void {
>>>>>>> 9093ba2217a723abd4de619ba7690c79cda2ea7a
  }

}
