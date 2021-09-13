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

  getAll():Observable<any>{
    return this.http.get(environment.url_api + 'user-list/',{headers:this.authService.setHeader()});
  }

  update(data: any, id: number): Observable<any> {
    return this.http.put(environment.url_api + "auth/users/" + id + "/update-profile", data, {headers: this.authService.setHeader()});
  }

  getById(id: number): Observable<any> {
    return this.http.get(environment.url_api + id +'/user-profile', {headers: this.authService.setHeader()})
  }

  changeUserLogin(user: any) {
    this.userLogin.next(user);
    localStorage.setItem('userLogin', JSON.stringify(user));
  }

  findUser():Observable<any>{
    return this.http.get(environment.url_api + 'findUser',{headers:this.authService.setHeader()});
  }

  listFriend(id:number):Observable<any>{
    return this.http.get(environment.url_api +'auth/users/' + id+ '/listFriend',{headers:this.authService.setHeader()});
  }

  listUsers():Observable<any>{
    return this.http.get(environment.url_api +'auth/users/listUsers',{headers:this.authService.setHeader()} );
  }

  addFriend(id:number):Observable<any>{
    return this.http.get(environment.url_api +'auth/users/'+ id +'/addFriend',{headers:this.authService.setHeader()});
  }

  deleteRequest(id:number):Observable<any>{
    return this.http.delete(environment.url_api + 'auth/users/' + id + '/deleteRequest',{headers:this.authService.setHeader()});
  }

  acceptFriend(id:number):Observable<any>{
    return this.http.get(environment.url_api +'auth/users/'+id +'/acceptFriend',{headers:this.authService.setHeader()});
  }

  requestFriend(id:number):Observable<any>{
    return this.http.get(environment.url_api +'auth/users/'+id + '/requestFriend',{headers:this.authService.setHeader()});
  }
}
