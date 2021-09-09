import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpClient: HttpClient,
              private authService: AuthService) { }

  getAll() :Observable<any>{
    return this.httpClient.get(environment.url_api + 'posts/getAll',{headers: this.authService.setHeader()});
  }

  getPostById(id:number):Observable<any>{
    return this.httpClient.get(environment.url_api + 'posts/' + id + '/showPost',{headers:this.authService.setHeader()});
  }

  getPostByUser(id:any): Observable<any>{
    return this.httpClient.get(environment.url_api + 'posts/getPostByUser/' + id ,{headers: this.authService.setHeader()});
  }

  searchPostByUser(name:any):Observable<any>{
    return this.httpClient.get(environment.url_api + 'findUser/?name=' + name,{headers:this.authService.setHeader()});
  }

  create(data:any):Observable<any>{
    return this.httpClient.post(environment.url_api + 'posts/create',data,{headers: this.authService.setHeader()});
  }

  update(data:any,id:number):Observable<any>{
    return this.httpClient.put(environment.url_api + 'posts/' + id + '/update' ,data,{headers: this.authService.setHeader()});
  }

  delete(id:number):Observable<any>{
    return this.httpClient.delete(environment.url_api + 'posts/' + id + '/delete',{headers: this.authService.setHeader()});
  }

  like(id:any):Observable<any>{
    return this.httpClient.get(environment.url_api + 'posts/' + id + '/likePost',{headers: this.authService.setHeader()});
  }

  disLike(id:any):Observable<any>{
    return this.httpClient.delete(environment.url_api + 'posts/' + id + '/disLike',{headers: this.authService.setHeader()});
  }

  getCountLikeByPost(id:any):Observable<any>{
    return this.httpClient.get(environment.url_api + 'posts/' +id +'/countLike',{headers:this.authService.setHeader()});
  }
}

