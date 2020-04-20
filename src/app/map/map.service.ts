import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Utils } from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  url = 'https://maps.googleapis.com/maps/api/geocode/json?';
  constructor( private http: HttpClient) {}

  getLatLongFromAddress(address) {
    // console.log(this.url + `address=${address}&key=${Utils.getGoogleMapKey()}`)
    return this.http.get(this.url + `address=${address}&key=${Utils.getGoogleMapKey()}`);
  }

  getNearbyRetailers() {
    
  }

}
