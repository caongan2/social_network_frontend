import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  changePassword(data: { email: string, password: string }): any {
    return this.http.post<any>('http://localhost:8000/api/change-password', data);
  }
}
