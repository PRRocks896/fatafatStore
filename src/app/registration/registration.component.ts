import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, ControlContainer, Validators } from '@angular/forms'
import { Title } from '@angular/platform-browser';

import { Utils } from '../shared/utils';
import { MapService } from '../map/map.service';
import { RegisterationService } from './registeration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  signUpForm:FormGroup;

  latitude: number;
  longitude: number;
  zoom:number;
  
  address: any = '';
  constructor(private titleService: Title, private mapService: MapService,
    private registrationService: RegisterationService) {
    this.titleService.setTitle('Registration Retailer' + Utils.getAppName());
  }

  ngOnInit(): void {
    this.setCurrentLocation();
    this.signUpForm = new FormGroup({
      'StoreName': new FormControl('',),
      'Password': new FormControl('',),
      'FirstName': new FormControl('',),
      'LastName': new FormControl('',),
      'Address': new FormControl('',),
      'Address1': new FormControl('',),
      'City': new FormControl('',),
      'State': new FormControl('',),
      'Pincode': new FormControl('',),
      'Email': new FormControl('',),
      // 'Location': new FormControl('', Validators.required),
      'Phonenumber': new FormControl(''),
      'otp': new FormControl(''),
      'DeliveryOptions': new FormControl('',)
    });
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
    this.registrationService.addNewRetailer(this.signUpForm.value).subscribe((res: any) => {
      console.log(res);
    }, (err: any) => {
      console.error(err);
    })
  }

  onVerifyOtp() {
    console.log("In verify");
  }

  onGetOtp() {
    console.log("In get otp");
  }


  markerDragEnd($event: MouseEvent) {
    this.signUpForm.value['Location'] = ($event)['coords'];

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
