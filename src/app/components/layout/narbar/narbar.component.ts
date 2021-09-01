import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-narbar',
  templateUrl: './narbar.component.html',
  styleUrls: ['./narbar.component.css']
})
export class NarbarComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
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
