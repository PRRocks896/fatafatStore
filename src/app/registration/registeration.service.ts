import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Utils } from '../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class RegisterationService {

  header = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': Utils.getAPIToken()
  });
  constructor( private http: HttpClient) {}

  addNewRetailer(body) {
    const params = new HttpParams({
      fromObject: {
        StoreName: body.StoreName,
        Password: body.Password,
        FirstName: body.FirstName,
        LastName: body.LastName,
        Address: body.Address,
        Address1: body.Address1,
        City: body.City,
        StateID: body.State,
        Pincode: body.Pincode,
        Email: body.Email,
        Location: body.Location,
        Latitude: body.Latitude,
        Longitude: body.Longitude,
        InveroryTypeID: '',
        Phonenumber: body.Phonenumber,
        DeliveryOptions: body.DeliveryOptions
      }
    });
    return this.http.post(Utils.getDefaultUrl() + 'Account/Retailer', params, {headers: this.header});
  }
}
