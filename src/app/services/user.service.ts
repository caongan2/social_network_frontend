import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userLogin = new BehaviorSubject(null);
  userCast = this.userLogin.asObservable();

  constructor(private http: HttpClient,
              private authService: AuthService) {
    let data = localStorage.getItem('userLogin');
    if (data) {
      this.changeUserLogin(JSON.parse(data));
    }
  }

  update(data: any, id: number): Observable<any> {
    return this.http.put(environment.url_api + "auth/users/" + id + "/update-profile", data, {headers: this.authService.setHeader()});
  }

  getById(): Observable<any> {
    return this.http.get(environment.url_api + "auth/users/user-profile", {headers: this.authService.setHeader()})
  }

  // set item(value: any){
  //   this.userLogin.next(value);
  //   localStorage.setItem('userLogin',JSON.stringify(value));
  // }
  //
  // get item(){
  //   return localStorage.getItem('userLogin');
  // }

  changeUserLogin(user: any) {
    this.userLogin.next(user);
    localStorage.setItem('userLogin', JSON.stringify(user));
  }
}
