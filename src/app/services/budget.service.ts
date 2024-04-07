import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private headers: HttpHeaders;
  apiUrl = environment.apiUrl
  authToken = localStorage.getItem("userData");
  constructor(
    private http: HttpClient
  ) {
    const authToken = localStorage.getItem("userData");
    this.headers = new HttpHeaders()
      .set('Authorization', authToken)
      .set('Content-Type', 'application/json');
    console.log("🚀 ~ BudgetService ~  this.headers:", this.headers)
    //console.log("🚀 ~ BudgetService ~ headers:", s)
  }

  adbudget(params): Observable<any> {
    console.log("🚀 ~ BudgetService ~  this.headers:", this.headers)

    console.log("🚀 ~ BudgetService ~ adbudget ~ params:", params, { headers: this.headers });
    const url = this.apiUrl + 'addbudget';
    console.log("🚀 ~ BudgetService ~ adbudget ~ url:", url);

    return this.http.post<any>(url, params).pipe(
      catchError(error => {
        console.log("🚀 ~ BudgetService ~ adbudget ~ error:", error);
        return throwError(error);
      })
    );
  }

}
