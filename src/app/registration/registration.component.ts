import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ControlContainer } from '@angular/forms'
import { Title } from '@angular/platform-browser';

import { Utils } from '../shared/utils';

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

  constructor() { }

  ngOnInit(): void {
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
      'number': new FormControl(''),
      'otp': new FormControl(''),
      'deliveryMedium': new FormControl('',)
    });
    this.setCurrentLocation();
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

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  markerDragEnd($event: MouseEvent) {
    console.log(($event)['coords']);
    // this.latitude = $event.coords.lat;
    // this.longitude = $event.coords.lng;
    // this.getAddress(this.latitude, this.longitude);
  }
}
