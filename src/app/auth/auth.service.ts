import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  apiUrl = environment.apiUrl

  login(params): Observable<any> {
    const crendation = params
    return this.http.post(this.apiUrl + 'login', crendation)
  }

  signup(params):Observable<any>{
    return this.http.post(this.apiUrl+'signup',params)

  }

}
