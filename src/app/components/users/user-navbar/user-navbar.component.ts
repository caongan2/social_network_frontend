import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {PostService} from "../../../services/post.service";

@Component({
  selector: 'app-user-navbar',
  templateUrl: './user-navbar.component.html',
  styleUrls: ['./user-navbar.component.css']
})
export class UserNavbarComponent implements OnInit {
  @Output() name = new EventEmitter<string>()
  @Output() friend = new EventEmitter<any>()
  user: any
  postsFilter:any = [];
  request:any = [];

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private postService: PostService,
              private activatedRoute: ActivatedRoute) { }

  // @ts-ignore
  id =+ this.activatedRoute.snapshot.paramMap.get('id');
  ngOnInit(): void {
    this.user = JSON.parse(<string>this.authService.getUser());
    this.userService.userCast.subscribe(user => this.user = user);
    this.getRequest();
  }


  logout() {
    this.authService.logout().subscribe(res => {
      localStorage.clear()
      this.router.navigate(['']).then(r => {
        console.log(res)
      }).catch(error => {
        console.log("Logout error")
      })
    })
  }

  seachUser(event:any){
    let value = event.target.value;
    this.name.emit(value);
    this.postService.searchPostByUser(value).subscribe(res=>{
      console.log(res);
    })

  }

  requestFriend(event:any){
    event.value = this.user.id;
    console.log(event.value)
    this.friend.emit(event.value)
    return this.userService.requestFriend(event.value).subscribe(res=>{
      this.request.length = res.length;
    })
  }

  getRequest(){
    return this.userService.requestFriend(this.user.id).subscribe(res=>{
      this.request = res;
    })
  }



}
