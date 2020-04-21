import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Utils } from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class RegisterationService {

  header = new HttpHeaders({
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': Utils.getAPIToken()
  });
  constructor( private http: HttpClient) {}

  addNewRetailer(body, file) {
    let params = new FormData();
    params.append('file', file);
    params.append('cst', JSON.stringify(body));
    return this.http.post(Utils.getDefaultUrl() + 'Account/Retailer', params, {headers: this.header});
  }
}
