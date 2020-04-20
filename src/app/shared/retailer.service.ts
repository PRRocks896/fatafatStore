import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Utils } from './utils';

@Injectable({
  providedIn: 'root'
})
export class RetailerService {

  header = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': Utils.getAPIToken()
  });
  constructor( private http: HttpClient) {}

  storeImage(files) {
    let data = new FormData();
    data.append('file', files);
    return this.http.post(Utils.getDefaultUrl() + 'myfileupload', data);
  }
}
