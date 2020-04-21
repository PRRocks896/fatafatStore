import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Utils } from './utils';

@Injectable({
  providedIn: 'root'
})
export class RetailerService {

  header = new HttpHeaders({
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': Utils.getAPIToken()
  });
  constructor( private http: HttpClient) {}

  storeImage(files) {
    let data = new FormData();
    data.append('file', files);
    return this.http.post(Utils.getDefaultUrl() + 'myfileupload', data);
  }

  storeInventory(body, file) {
    const params = new FormData();
    params.append('file', file);
    params.append('cst', JSON.stringify(body));
    return this.http.post(Utils.getDefaultUrl() + 'shopping/Inventory', params, {headers: this.header});
  }

}
