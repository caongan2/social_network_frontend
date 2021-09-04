import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup | undefined

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      name: [''],
      email: [''],
      phone: [''],
      password: [''],
      password_confirmation: ['']
    })
  }

  submit() {
    let data = this.formRegister?.value
    this.authService.register(data).subscribe(res => {
      this.router.navigate(['']).then(r => {
        console.log('Register account successfully')
      }).catch(error => {
        console.log('Register error')
      })
    })
  }

}
