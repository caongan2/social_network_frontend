import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) {
  }

  setHeader(){
    let token = JSON.parse(<string>localStorage.getItem('token'));
    return new HttpHeaders().set('Authorization','Bearer' + token);
  }

  login(data: any): Observable<any> {
    return this.http.post(environment.url_api + "auth/login", data,{headers: this.setHeader()});
  }

  register(data: any): Observable<any> {
    return this.http.post(environment.url_api + "auth/register", data, {headers: this.setHeader()} )
  }

  logout() {
    return this.http.post(environment.url_api + "auth/logout", null, {headers: this.setHeader()})
  }

}
