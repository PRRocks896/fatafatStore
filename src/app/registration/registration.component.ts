import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ControlContainer, Validators } from '@angular/forms'
import { Title } from '@angular/platform-browser';

import { Utils } from '../shared/utils';
import { MapService } from '../map/map.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  latitude: number;
  longitude: number;
  zoom:number;

  signUpForm:FormGroup;

  address: any = '';
  constructor(private titleService: Title, private mapService: MapService) {
    this.titleService.setTitle('Registration Retailer' + Utils.getAppName());
  }

  ngOnInit(): void {
    this.setCurrentLocation();
    this.signUpForm = new FormGroup({
      'shopName': new FormControl('',),
      'password': new FormControl('',),
      'firstName': new FormControl('',),
      'lastName': new FormControl('',),
      'addressLine1': new FormControl('',),
      'city': new FormControl('',),
      'state': new FormControl('',),
      'pincode': new FormControl('',),
      'email': new FormControl('',),
      'location': new FormControl('', Validators.required),
      'number': new FormControl(''),
      'otp': new FormControl(''),
      'deliveryMedium': new FormControl('',)
    });
    this.setCurrentLocation();
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

  onSubmit() {
    console.log(this.signUpForm.value);
  }

  onVerifyOtp() {
    console.log("In verify");
  }

  onGetOtp() {
    console.log("In get otp");
  }


  markerDragEnd($event: MouseEvent) {
    console.log(($event)['coords']);
    // this.latitude = $event.coords.lat;
    // this.longitude = $event.coords.lng;
    // this.getAddress(this.latitude, this.longitude);
  }
  getStoreAddress() {
    console.log(this.address);
    this.mapService.getLatLongFromAddress(this.address).subscribe((res: any) => {
      console.log(res);
    }, err => {
      console.error(err);
    })
  }

}
