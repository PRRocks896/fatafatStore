import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Utils } from '../shared/utils';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  header = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': Utils.getAPIToken()
  });
  constructor( private http: HttpClient, private commonService: CommonService) {}

  storeInverntory(body) {
    const params = new HttpParams({
      fromObject: {
        RetailerId: body.retailerId,
        ItemName: body.itemname,
        ItemImageList: body.itemImageList
      }
    });

    return this.http.post(Utils.getDefaultUrl() + 'shopping/Inventory', params , {headers: this.header});
  }

  getInventory(retailerID) {
    return this.http.get(Utils.getDefaultUrl() + 'Inventory?RetailerId' + retailerID, {headers: this.header});
  }

  deleteInventoryImage(itemID) {
    const params = new HttpParams({
      fromObject: {
        ItemId: itemID
      }
    });
    return this.http.post(Utils.getDefaultUrl() + `Inventory/delete/Itemid=${itemID}`, params, {headers: this.header});
  }
}
