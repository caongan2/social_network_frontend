import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-user-profile-banner',
  templateUrl: './user-profile-banner.component.html',
  styleUrls: ['./user-profile-banner.component.css']
})
export class UserProfileBannerComponent implements OnInit {

  user: any;
  constructor(private userService: UserService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.user = JSON.parse(<string>this.authService.getUser())
  }
}
