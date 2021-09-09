import {Component, OnInit, Output,EventEmitter} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {PostService} from "../../../services/post.service";

@Component({
  selector: 'app-narbar',
  templateUrl: './narbar.component.html',
  styleUrls: ['./narbar.component.css']
})
export class NarbarComponent implements OnInit {
  @Output() name = new EventEmitter<string>()
  user: any;
  postsFilter:any = [];

  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService,
              private postService: PostService) { }

  ngOnInit(): void {
    // this.user = JSON.parse(<string>this.authService.getUser());
    this.userService.userCast.subscribe(user => this.user = user);
  }


  logout() {
    this.authService.logout().subscribe(res => {
      localStorage.clear()
      this.router.navigate(['']).then(r => {
        console.log(res)
        // console.log('Success')
      }).catch(error => {
        console.log("Logout error")
      })
    })
  }

  // getName(event:any){
  //   let value = event.target.value;
  //   console.log(value)
  //   return value;
  // }

  seachUser(event:any){
    let value = event.target.value;
    this.name.emit(value);
    this.postService.searchPostByUser(value).subscribe(res=>{
      console.log(res);
    })

  }



}
