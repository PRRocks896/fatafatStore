import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Utils } from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  header = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': Utils.getAPIToken()
  });
  constructor( private http: HttpClient) {}

  doLogin(body) {
    const params = new HttpParams({
      fromObject: {
        PhoneNumber: body.email,
        Password: body.password,
      }
    });

    return this.http.post(Utils.getDefaultUrl() + 'Account/Login', params , {headers: this.header});
  }
}
