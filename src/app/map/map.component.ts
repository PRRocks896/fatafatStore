import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { google } from "google-maps";
import { CommonService } from '../shared/common.service';
import { MapService } from './map.service';

declare var google : google;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  title: string = 'AGM project';
  latitude = 23.0293504;
  longitude = 72.5778432;
  zoom = 15;
  address: string;
  geoCoder;
  retailerList:any = [];
  iconUrl = {
    url: "../assets/images/icons-01.png",
    scaledSize: {
      width: 40,
      height: 45
    }
  } 

  @ViewChild('search')
  public searchElementRef: ElementRef;
  
  constructor(private mapsAPILoader: MapsAPILoader,private ngZone: NgZone,
    private commonService: CommonService, private mapService: MapService) { }

  ngOnInit(): void {
    this.setCurrentLocation();
    this.getAllRetailers();
    console.log(this.retailerList);
   }

   private setCurrentLocation() {
    // if ('geolocation' in navigator) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     console.log(position);
    //     this.latitude = position.coords.latitude;
    //     this.longitude = position.coords.longitude;
    //     this.zoom = 15;
    //   });
    // } else {
      this.latitude = 23.0293504;
      this.longitude = 72.5778432;
      this.zoom = 15;
    // }
  }
  private getAllRetailers() {
    this.retailerList = [
      {latitude:26.50201729081622 , longitude: 80.22127081534423, shopName: 'some-shop'},
      {latitude:26.490379761806718 , longitude: 80.2207987465576, shopName: 'some-other-shop'},
      {},];
  }

  getStoreList() {
    this.commonService.getLatLongFromAddress(this.address).subscribe((res: any) => {
      // this.mapService.getLatLongFromAddress(this.address).subscribe((res: any) => {
        console.log(res);
      }, err => {
        console.error(err);
      });
    // });  
  }

  markerDragEnd($event: MouseEvent) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    console.log(this.latitude +" "+this.longitude);
  }

  openWindow() {
    console.log("hello");
  }
}
