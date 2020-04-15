import { Component, OnInit } from '@angular/core';
import { MapService } from './map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom:number;
  constructor(private mapService: MapService) { }

  ngOnInit(): void {
    this.setCurrentLocation(); 
    this.mapService.getLatLongFromAddress(360006).subscribe((res: any) => {
      console.log(res);
    }, err => {
      console.error(err);
    }) 
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

  getStoreList(address: any) {
    this.mapService.getLatLongFromAddress(360006).subscribe((res: any) => {
      console.log(res);
    }, err => {
      console.error(err);
    })
  }

}
