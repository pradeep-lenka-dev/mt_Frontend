import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://mt-backend-pn1v.onrender.com/login'
  getAllUsers(): Observable<any> {
    return this.http.get('https://mt-backend-pn1v.onrender.com/users')
  }

  login(params): Observable<any>{
    const crendation = params
    return this.http.post(this.apiUrl,crendation)
  }

}
