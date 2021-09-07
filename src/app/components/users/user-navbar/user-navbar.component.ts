import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {


  user:any;
  // @ts-ignore
  id = +this.activatedRoute.snapshot.paramMap.get('id')
  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
