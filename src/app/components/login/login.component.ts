import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {GoogleLoginProvider, SocialAuthService, SocialUser} from "angularx-social-login";
import {DashboardService} from "../../services/dashboard.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin ?: FormGroup;
  socialUser?: SocialUser;
  isLoggedin?: boolean;
  error = ""
  count_user = 0
  count_post = 0
  user_onl = 0
  constructor(private authService: AuthService,
              private fb:FormBuilder,
              private router: Router,
              private userService: UserService,
              private socialAuthService: SocialAuthService,
              private dashboard: DashboardService) { }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['',[Validators.required,Validators.minLength(6),Validators.maxLength(20)]],
    });
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      // console.log(this.socialUser);
    });
  }

  getCount() {
    return this.dashboard.getCountData().subscribe(res => {
      this.count_user = res.user
      this.count_post = res.post
      this.user_onl = res.online
    })
  }
  onSubmit() {
    let data = this.formLogin?.value;
    this.authService.login(data).subscribe(res => {
      if (res.access_token) {
        this.userService.changeUserLogin(res.user);
        localStorage.setItem('token', JSON.stringify(res.access_token));
        this.router.navigate(['admin/home/posts']);
      } else {
        this.error = res.message
      }
    });
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res => {
      this.loginByGoogle(res.authToken);
    });
  }

  loginByGoogle(accessToken: any) {
    let data = {'access_token' : accessToken};
    this.authService.loginByGoogle(data).subscribe((res: any) => {
      this.userService.changeUserLogin(res.user);
      localStorage.setItem('token', JSON.stringify(res.access_token));
      this.router.navigate(['admin/home/posts']);
    });
  }

  get email() {
    return this.formLogin?.get('email');
  }

  get password() {
    return this.formLogin?.get('password');
  }

}
