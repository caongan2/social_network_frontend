import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  
  userForm = this.fb.group({
    email: ['null'],
    password: [''],
  });
  
  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }
  onSubmit(data: { email: string, password: string }) {
    console.log(data);
    this.userService.changePassword(data).subscribe((resp: any) => {
      console.log(resp);
    }, (error: any) => console.log(error));
  }
}
