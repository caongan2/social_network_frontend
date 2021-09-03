import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {FormBuilder, FormGroup} from "@angular/forms";

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
    this.userService.getById(this.id).subscribe(res => {
      this.formEditProfile = this.fb.group({
        name: [res.name],
        phone: [res.phone],
        address: [res.address],
        interest: [res.interest],
        birth_date: [res.birth_date],
      })
    })
  }

  submit() {
    let data = this.formEditProfile?.value;
    this.userService.update(data,this.id).subscribe(res => {
      this.router.navigate(['home']);
    })
  }

}
