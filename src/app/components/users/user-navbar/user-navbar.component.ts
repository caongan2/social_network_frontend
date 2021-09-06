import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {

  user:any;

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.getById().subscribe(res => {
      this.user = res;
    })
  }

}
