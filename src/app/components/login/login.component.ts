import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin ?: FormGroup;
  constructor(private authService: AuthService,
              private fb:FormBuilder,
              private router: Router,
              private userService: UserService) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  onSubmit() {
    let data = this.formLogin?.value;
    this.authService.login(data).subscribe(res => {
      this.userService.changeUserLogin(res.user);
      localStorage.setItem('token', JSON.stringify(res.access_token));
      // localStorage.setItem('userLogin', JSON.stringify(res.user));
      this.router.navigate(['admin/home/posts']);
      console.log(res);
    });
  }

}
