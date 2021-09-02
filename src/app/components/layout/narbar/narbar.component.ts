import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-narbar',
  templateUrl: './narbar.component.html',
  styleUrls: ['./narbar.component.css']
})
export class NarbarComponent implements OnInit {

  user: any

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(<string>this.authService.getUser())
  }


  logout() {
    this.authService.logout().subscribe(res => {
      localStorage.clear()
      this.router.navigate(['']).then(r => {
        console.log('Success')
      }).catch(error => {
        console.log("Logout error")
      })
    })
  }
}
