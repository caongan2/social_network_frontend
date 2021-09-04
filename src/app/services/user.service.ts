import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  update(data:any, id: number):Observable<any> {
    return this.http.put(environment.url_api + "auth/users/" + id + "/update-profile", data, {headers: this.authService.setHeader()});
  }

  getById():Observable<any> {
    return this.http.get(environment.url_api + "auth/user-profile", {headers: this.authService.setHeader()})
  }
}
