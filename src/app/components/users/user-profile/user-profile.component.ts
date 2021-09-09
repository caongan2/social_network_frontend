import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../services/auth.service";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: any;
  // @ts-ignore
  id = +this.activatedRoute.snapshot.paramMap.get('id');

  constructor(private userService: UserService,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.user = JSON.parse(<string>this.authService.getUser())
  }

}
