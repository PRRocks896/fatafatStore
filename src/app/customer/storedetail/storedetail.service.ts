import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Utils } from '../../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class StoredetailService {

  header = new HttpHeaders({
    'token': localStorage.getItem('token'),
    'apikey': Utils.getDefaultApiKey(),
    'Content-Type': Utils.getContentType()
  });
  constructor( private http: HttpClient) {}
}
