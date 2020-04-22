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
  latitude = 26.5123;
  longitude = 80.2329;
  zoom = 15;
  address: string;
  geoCoder;
  retailerList:any = [];
  iconUrl = {
    url: "../assets/images/icons-01.png",
    scaledSize: {
      width: 30,
      height: 35
    }
  } 

  @ViewChild('search')
  public searchElementRef: ElementRef;
  
  constructor(private mapsAPILoader: MapsAPILoader,private ngZone: NgZone,
    private commonService: CommonService, private mapService: MapService) { }

  ngOnInit(): void {
    this.setCurrentLocation();
    // this.getAllRetailers();
    // this.getAllRetailers();
    // console.log(this.retailerList);


    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement);
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          // console.log(place);

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
          const body = {
            location: place.address_components[1].long_name,
            latitude: this.latitude,
            longitude: this.longitude
          }
          this.mapService.getNearbyRetailers(body).subscribe((res: any) => {
            console.log(res);
            if(res.errorcode == '0') {
              this.retailerList = [];
              res.StoreList.filter(store => {
                this.retailerList.push({latitude: store.Latitude , longitude: store.Longitude, shopName: store.StoreName})
              });
              console.log(this.retailerList);
            } else {
              alert(res['message']);
            }
          },err => console.error(err));
        });
      });
    });

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
      this.latitude = 26.5123;
      this.longitude = 80.2329;
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
    // console.log(this.address);
    // this.commonService.getLatLongFromAddress(this.address).subscribe((res: any) => {
    //   // this.mapService.getLatLongFromAddress(this.address).subscribe((res: any) => {
    //     console.log(res);
    //   }, err => {
    //     console.error(err);
    //   });
    // // });  
  }

  markerDragEnd($event: MouseEvent) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    // console.log(this.latitude +" "+this.longitude);
  }

  openWindow() {
    // console.log("hello");
  }
}
