import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient,
              private authService: AuthService) { }

  getCommentByPost(id: number): Observable<any> {
    return this.http.get(environment.url_api + 'comment/commentByPost/' + id, {headers: this.authService.setHeader()})
  }

  delete(id: number): Observable<any> {
    return this.http.delete(environment.url_api + 'comment/delete/' + id, {headers: this.authService.setHeader()})
  }

  comment(data: any): Observable<any> {
    return this.http.post(environment.url_api + 'comment/create', data, {headers: this.authService.setHeader()})
  }



}
