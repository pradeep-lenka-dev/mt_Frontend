import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
//import * as jwt from 'jsonwebtoken';


@Injectable({
    providedIn: 'root'
})
export class commonService {

    constructor(private http: HttpClient) { }
    apiUrl = environment.apiUrl
    getLoggedInUser() {
        let authToken = localStorage.getItem('userData')
        console.log("🚀 ~ commonService ~ apiUrl:", this.apiUrl)
        const LogedinUser = JSON.parse(authToken);
        return LogedinUser.loginUser
        // let dec = jwt.decode(authToken)
        // console.log(token.loginUser)
    }

    getCategoriesList(): Observable<any> {
        return this.http.post(this.apiUrl + 'getCategoriesList', '')
    }

}