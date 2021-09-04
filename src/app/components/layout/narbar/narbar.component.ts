import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-narbar',
  templateUrl: './narbar.component.html',
  styleUrls: ['./narbar.component.css']
})
export class NarbarComponent implements OnInit {

  user: any

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    // this.user = JSON.parse(<string>this.authService.getUser());
    this.userService.userCast.subscribe(user => this.user = user);
  }


  logout() {
    this.authService.logout().subscribe(res => {
      localStorage.clear()
      this.router.navigate(['']).then(r => {
        console.log(res)
        // console.log('Success')
      }).catch(error => {
        console.log("Logout error")
      })
    })
  }

}
