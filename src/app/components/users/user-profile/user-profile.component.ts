import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: any;
  // @ts-ignore
  id = +this.activatedRoute.snapshot.paramMap.get('id');

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
