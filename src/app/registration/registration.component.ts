import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormControl, ControlContainer, Validators } from '@angular/forms'
import { Title } from '@angular/platform-browser';

import { Utils } from '../shared/utils';
import { MapService } from '../map/map.service';
import { RegisterationService } from './registeration.service';
import { Router } from '@angular/router';
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  signUpForm:FormGroup;

  latitude = 23.0293504;
  longitude = 72.5778432;
  zoom = 15;
  geoCoder;


  locationError: string;
  
  address: any = '';

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private titleService: Title, private mapService: MapService,
    private ngZone: NgZone,
    private registrationService: RegisterationService, private router: Router,
    private mapsAPILoader: MapsAPILoader) {
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
      'Latitude': new FormControl('',),
      'Longitude': new FormControl('',),
      // 'Location': new FormControl('', Validators.required),
      'Phonenumber': new FormControl(''),
      'otp': new FormControl(''),
      'DeliveryOptions': new FormControl('',)
    });
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

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
        });
      });
    });
  }

  private setCurrentLocation() {
    // if ('geolocation' in navigator) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     this.latitude = position.coords.latitude;
    //     this.longitude = position.coords.longitude;
    //     this.zoom = 15;
    //   });
    // }
    this.latitude = 23.0293504;
      this.longitude = 72.5778432;
      this.zoom = 15;
  }

  onSubmit() {
    // console.log(this.signUpForm.value);
    this.registrationService.addNewRetailer(this.signUpForm.value).subscribe((res: any) => {
      // console.log(res);
      if(res['errorcode'] == '0')  {
        this.signUpForm.reset();
        alert(res['message']);
        this.router.navigate(['/']);
      } else {
        
        alert(res['message']);
      }
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
    this.latitude = $event['coords'].lat;
    this.longitude = $event['coords'].lng;
    // this.getAddress(this.latitude, this.longitude);
  }
  getStoreAddress() {
    // console.log(this.address);
    this.mapService.getLatLongFromAddress(this.address).subscribe((res: any) => {
      // console.log(res);
      if(res['results'].length > 0) {
        this.locationError = '';
        const detail = res['results'][0];
        this.latitude = detail['geometry']['location']['lat'];
        this.longitude = detail['geometry']['location']['lng'];
        console.log(this.latitude);
        console.log(this.longitude);
        this.signUpForm.patchValue({Latitude: this.longitude});
        this.signUpForm.patchValue({Longitude: this.longitude});
      } else {
        this.locationError = 'Location not found'
      }
    }, err => {
      console.error(err);
    })
  }

}
