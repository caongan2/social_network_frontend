import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Location} from "@angular/common";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  formChangePassword ?: FormGroup;
  message ?: string;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private location: Location) {
  }

  ngOnInit(): void {
    this.formChangePassword = this.fb.group({
        old_password: ['', [Validators.required]],
        new_password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
        new_password_confirmation: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
      }
      // {
      //   validator: ChangePasswordComponent.MatchPassword
      // }
    );
  }

  onSubmit() {
    let data = this.formChangePassword?.value;
    this.authService.changePassword(data).subscribe((res: any) => {
      if (res.error) {
        console.log(res);
        return this.toastr.error('password is wrong or new password is not confirmed')
      }
      return this.toastr.success('Change password success!');
    }, (error: any) => console.log(error));
  }

  // @ts-ignore
  // static MatchPassword(abstractControl: AbstractControl) {
  //   // @ts-ignore
  //   let password = abstractControl.get('new_password').value;
  //   // @ts-ignore
  //   let confirmPassword = abstractControl.get('new_password_confirmation').value;
  //   if (password != confirmPassword) {
  //     // @ts-ignore
  //     abstractControl.get('new_password_confirmation').setErrors({
  //       MatchPassword: true
  //     })
  //   } else {
  //     return null
  //   }
  // }

  get old_password() {
    return this.formChangePassword?.get('old_password')
  }

  get new_password() {
    return this.formChangePassword?.get('new_password');
  }

  get new_password_confirmation() {
    return this.formChangePassword?.get('new_password_confirmation');
  }

  back() {
    this.location.back();
  }
}
