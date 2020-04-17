import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Utils } from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  header = new HttpHeaders({
    'Access-Control-Allow-Headers': 'x-auth, content-type',
    'Content-Type': 'application/x-www-form-urlencoded',
    'username': Utils.getAPIBasic().username,
    'password': Utils.getAPIBasic().password,
    'ClientID': Utils.getAPIBasic().clientid
  });
  constructor( private http: HttpClient) {}

  getToken() {
      let body = new FormData();
      body.append('grant_type', Utils.getAPIBasic().grant_type);
      return this.http.post(Utils.getDefaultUrl() + 'token', body, {headers: this.header, withCredentials: true});
  }

  url = 'https://maps.googleapis.com/maps/api/geocode/json?';

  getLatLongFromAddress(address) {
    // console.log(this.url + `address=${address}&key=${Utils.getGoogleMapKey()}`)
    return this.http.get(this.url + `address=${address}&key=${Utils.getGoogleMapKey()}`);
  }
}
