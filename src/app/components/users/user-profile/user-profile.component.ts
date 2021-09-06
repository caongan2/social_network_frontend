import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";


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
              private fb:FormBuilder,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.getById().subscribe(res => {
      this.user = res
    })
  }

}
