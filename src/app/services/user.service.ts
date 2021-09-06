
import { Injectable } from '@angular/core';
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
               }
changePassword(item: { email: string, password: string }): any {
  return this.http.post<any>('http://localhost:8000/api/change-password', item);

    let data = localStorage.getItem('userLogin');
    if (data){
      this.changeUserLogin(JSON.parse(<string>data));
    }
  }

  update(data:any, id: number):Observable<any> {
    return this.http.put(environment.url_api + "auth/users/" + id + "/update-profile", data, {headers: this.authService.setHeader()});
  }

  getById():Observable<any> {
    return this.http.get(environment.url_api + "auth/user-profile", {headers: this.authService.setHeader()})
  }

 
  changeUserLogin(user: any){
    this.userLogin.next(user);
    localStorage.setItem('userLogin',JSON.stringify(user));
  }
}
