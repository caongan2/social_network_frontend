import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  // @ts-ignore
  id = +this.activatedRoute.snapshot.paramMap.get('id');
  formEditProfile  ?: FormGroup;
  constructor(private router: Router,
              private userService: UserService,
              private fb: FormBuilder,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.userService.getById().subscribe(res => {
      this.formEditProfile = this.fb.group({
        name: [res.name,[Validators.minLength(2),Validators.maxLength(50),Validators.pattern(/^[A-Z a-z]+$/)]],
        phone: [res.phone,[Validators.pattern(/^0[1-9][0-9]{8}$/)]],
        address: [res.address,[Validators.minLength(2),Validators.maxLength(50)]],
        interest: [res.interest,[Validators.minLength(2),Validators.maxLength(50)]],
        birth_date: [res.birth_date]
      });
    });
  }

  submit() {
    let data = this.formEditProfile?.value;
    this.userService.update(data,this.id).subscribe(res => {
      this.router.navigate(['admin/home/posts']);
      console.log(res);
    })
  }

  get name() {
    return this.formEditProfile?.get('name');
  }

  get phone() {
    return this.formEditProfile?.get('phone');
  }

  get address() {
    return this.formEditProfile?.get('address');
  }

  get interest() {
    return this.formEditProfile?.get('interest');
  }

  get birth_date() {
    return this.formEditProfile?.get('birth_date');
  }

  dateValidator(): ValidatorFn {
    return(control: AbstractControl): {[key: string]: any} | null =>{
      const today = new Date().getTime();
      if (!(control && control.value)) {
        return null;
      }
      return control.value.getTime() > today ? {invalidDate: 'You can not choose the day in future'} : null;
    }
  }
}