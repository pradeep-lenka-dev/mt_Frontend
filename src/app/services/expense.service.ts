import { Injectable } from "@angular/core";
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class expenseService {
    private headers: HttpHeaders;
    apiUrl = environment.apiUrl
    constructor(private http: HttpClient) {
       const authToken = localStorage.getItem("userData");
        this.headers = new HttpHeaders()
        .set('Authorization', authToken)
        .set('Content-Type', 'application/json');

    }

    addExpense(params): Observable<any> {
        const crendation = params
        const res = this.http.post(this.apiUrl + 'addexpense', crendation, { headers: this.headers })
        console.log("🚀 ~ expenseService ~ addExpense ~ res:", res)
        return res
    }
    fun() {
        const url = this.apiUrl + 'addbudget'
        const res = this.http.get<any>(this.apiUrl + 'addbudget',)
    }

    getExpense(): Observable<any> {
        return this.http.get(this.apiUrl + 'getAllExpense')
    }
    getRecentExpenses(params): Observable<any> {
        return this.http.post(this.apiUrl + 'getRecentExpenses', params)
        // console.log("🚀 ~ expenseService ~ getRecentExpenses ~ data:", data)
        // return data
    }
    getMonthExpense(params): Observable<any> {
        return this.http.post<any>(this.apiUrl + 'getCurentMonthExpense', params).pipe(
            catchError(error => {
                console.error('Error in fetching current month expenses:', error);
                return throwError(error); // Re-throwing the error for handling at a higher level
            })
        );
    }
    getAllUsers(): Observable<any> {
        return this.http.get(this.apiUrl + 'users')
    }

}
