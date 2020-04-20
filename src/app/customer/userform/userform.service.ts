import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Utils } from '../../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class UserformService {

  header = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': Utils.getAPIToken()
  });
  constructor( private http: HttpClient) {}

  postOrder(body) {
    const params = new HttpParams({
      fromObject: {
        FirstName: body.firstname,
        LastName: body.lastname,
        PhoneNumber: body.phonenumber,
        RetailerID: body.retailerID,
        OrderTypeID: '1',
        Address: body.address,
        Address1: body.address1,
        City: body.city,
        StateID: body.state,
        Pincode: body.pincode,
        Latitude: body.latitude,
        Longitude: body.longitude,
        ItemList: body.orderdescription,
        ItemListImages: ''
      }
    });
    // console.log(params);
    return this.http.post(Utils.getDefaultUrl() + 'Shopping/Order', params, {headers: this.header});
  }
}
