import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Utils } from '../../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class UserformService {

  header = new HttpHeaders({
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': Utils.getAPIToken()
  });
  constructor( private http: HttpClient) {}

  postOrder(body, file) {
    const params = new FormData();
    params.append('file', file);
    params.append('cst', JSON.stringify(body));

    return this.http.post(Utils.getDefaultUrl() + 'Shopping/Order', params, {headers: this.header});
  }
}
