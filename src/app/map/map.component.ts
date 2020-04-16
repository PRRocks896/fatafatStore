import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { google } from "google-maps";
import { CommonService } from '../shared/Common.service';
declare var google : google;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  latitude: number;
  longitude: number;
  zoom:number;
  address: string;
  geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;
  
  constructor(private mapsAPILoader: MapsAPILoader,private ngZone: NgZone,
    private commonService: CommonService) { }

  ngOnInit(): void {
    this.setCurrentLocation()
   }

   private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  getStoreList() {
    this.commonService.getLatLongFromAddress(this.address).subscribe((res: any) => {
      console.log(res);
    }, err => {
      console.error(err);
    })
  }

  markerDragEnd($event: MouseEvent) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    console.log(this.latitude +" "+this.longitude);
  }

}
