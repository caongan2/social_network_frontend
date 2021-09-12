import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {

  user: any

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(<string>this.authService.getUser());
  }


  logout() {
    this.authService.logout().subscribe(res => {
      localStorage.clear()
      this.router.navigate(['']).then(r => {
        console.log(res)
      }).catch(error => {
        console.log("Logout error")
      })
    })
  }

}
