import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin ?: FormGroup;
  socialUser?: SocialUser;
  isLoggedin?: boolean;
  constructor(private authService: AuthService,
              private fb:FormBuilder,
              private router: Router,
              private userService: UserService,
              private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(20)]],
    });
    // this.socialAuthService.authState.subscribe((user) => {
    //   this.socialUser = user;
    //   this.isLoggedin = (user != null);
    //   console.log(this.socialUser);
    // });
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

  loginWithGoogle(): void {
    let data = this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.loginByGoogle(data);
  }

  loginByGoogle(accessToken: any) {
    let data = {'access_token' : accessToken};
    this.authService.loginByGoogle(data).subscribe((res: any) => {
      this.userService.changeUserLogin(res.user);
      localStorage.setItem('token', JSON.stringify(res.access_token));
      this.router.navigate(['admin/home/posts']);
      console.log(res);
    });
  }

  get email() {
    return this.formLogin?.get('email');
  }

  get password() {
    return this.formLogin?.get('password');
  }

}
