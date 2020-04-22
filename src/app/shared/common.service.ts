import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Utils } from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  header = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'username': Utils.getAPIBasic().username,
    'password': Utils.getAPIBasic().password,
    'ClientID': Utils.getAPIBasic().clientid
  });
  constructor( private http: HttpClient) {}

  getToken() {
    // dchandra@epsilonium.com
    // dchandra@epsiloniu4m.com
    // 123456
    const params = new HttpParams({
      fromObject: {
        grant_type: Utils.getAPIBasic().grant_type
      }
    });
    // let body = new FormData();
    // body.append('grant_type', 'password');
    return this.http.post(Utils.getDefaultUrl() + 'token', params, {headers: this.header});
  }

  url = Utils.getGoogleMapKey();

  getLatLongFromAddress(address) {
    // console.log(this.url + `address=${address}&key=${Utils.getGoogleMapKey()}`)
    return this.http.get(this.url + `address=${address}&key=${Utils.getGoogleMapKey()}`);
  }

  getState() {
    return this.http.get(Utils.getDefaultUrl() + `Common/State`, { headers: new HttpHeaders({
      'Authorization': Utils.getAPIToken()
    })});
  }

  whatsappUrl = 'https://api.chat-api.com/instance119365/sendMessage?token=epu7vymklbgy06u3';

  sendOTP(body) {

    return this.http.post(this.whatsappUrl, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }

  sendMsg(body) {
    return this.http.post(this.whatsappUrl, JSON.stringify(body), {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  }
}
