import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Utils } from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  url = 'https://maps.googleapis.com/maps/api/geocode/json?';
  header = new HttpHeaders({
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': Utils.getAPIToken()
  });
  constructor( private http: HttpClient) {}

  getLatLongFromAddress(address) {
    // console.log(this.url + `address=${address}&key=${Utils.getGoogleMapKey()}`)
    return this.http.get(this.url + `address=${address}&key=${Utils.getGoogleMapKey()}`);
  }

  getNearbyRetailers(body) {
    // console.log(this.header);
    return this.http.get(Utils.getDefaultUrl() + `store?Location=${encodeURIComponent(body.location)}&Latitude=${body.latitude}&Longitude=${body.longitude}&Distance=${Utils.getDistance()}`, { headers: this.header});
  }

}
