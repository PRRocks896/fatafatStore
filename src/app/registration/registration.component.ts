import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormControl, ControlContainer, Validators } from '@angular/forms'
import { Title } from '@angular/platform-browser';

import { Utils } from '../shared/utils';
import { MapService } from '../map/map.service';
import { RegisterationService } from './registeration.service';
import { Router } from '@angular/router';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { CommonService } from '../shared/common.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  signUpForm:FormGroup;

  url:any = '';
  latitude = 26.5123;
  longitude = 80.2329;
  zoom = 15;
  geoCoder;

  edited = false;
  stateDetail: any = [];
  storeIamge: any;

  locationError: string;
  
  address: any = '';

  OTP: any = '';
  OTPVerify = false;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private titleService: Title, private mapService: MapService,
    private ngZone: NgZone,
    private commonService: CommonService,
    private registrationService: RegisterationService, private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private spinner: NgxSpinnerService) {
    this.titleService.setTitle('Registration Retailer' + Utils.getAppName());
  }


  ngOnInit(): void {
    this.setCurrentLocation();
    this.setState();
    this.signUpForm = new FormGroup({
      'StoreName': new FormControl('',),
      'Password': new FormControl('',),
      'FirstName': new FormControl('',),
      'LastName': new FormControl('',),
      'Address': new FormControl('',),
      'Address1': new FormControl('',),
      'City': new FormControl('',),
      'StateID': new FormControl(null,),
      'PinCode': new FormControl('',),
      'Email': new FormControl('',),
      'Latitude': new FormControl('',),
      'Longitude': new FormControl('',),
      'Location': new FormControl('',),
      'PhoneNumber': new FormControl(''),
      'InventoryTypeID': new FormControl('1',),
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
          // console.log(place);
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.signUpForm.patchValue({Latitude: this.latitude.toString()});
          this.signUpForm.patchValue({Longitude: this.longitude.toString()});
          this.signUpForm.patchValue({Location: place.address_components[1].long_name});
          this.zoom = 12;
        });
      });
    });
  }

  setState() {
    this.spinner.show();
    this.commonService.getState().subscribe((res: any) => {
      // console.log(res);
      this.spinner.hide();
      if(res.errorcode == '0') {
        this.stateDetail = res.StateList;
        // console.log(this.stateDetail);
      } else {
        alert(res.message);
      }
    }, err => {
      this.spinner.hide();
      console.error(err)});
  }

  addState(stateID) {
    // console.log(stateID);
    this.signUpForm.patchValue({StateID: stateID});
  }

  onSelectFile(event) {
    this.storeIamge = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      this.edited = true;
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }

  private setCurrentLocation() {
    // if ('geolocation' in navigator) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     this.latitude = position.coords.latitude;
    //     this.longitude = position.coords.longitude;
    //     this.zoom = 15;
    //   });
    // }
    this.latitude = 26.5123;
      this.longitude = 80.2329;
      this.zoom = 15;
  }

  onSubmit() {
    this.spinner.show();
    // console.log(this.signUpForm.value);
    // console.log(this.storeIamge);
    this.registrationService.addNewRetailer(this.signUpForm.value, this.storeIamge).subscribe((res: any) => {
      this.spinner.hide();
      if(res['errorcode'] == '0')  {
        this.signUpForm.reset();
        alert(res['message']);
        this.router.navigate(['/']);
      } else {
        alert(res['message']);
      }
    }, (err: any) => {
      this.spinner.hide();
      alert(err.error.message);
      console.error(err);
    })
  }

  onVerifyOtp() {
    // console.log("In verify");
    const enteredOTP = this.signUpForm.value.otp;
    if(enteredOTP == this.OTP) {
      this.OTPVerify = true;
      alert('OTP Verified');
    } else {
      alert('OTP does not match');
    }
  }

  onGetOtp() {
    // console.log("In get otp");
    this.commonService.getOTP().subscribe((res: any) => {
      // console.log(res);
      this.OTP = res.toString();
      const value = this.signUpForm.value.PhoneNumber;
      // console.log(value);
      this.commonService.sendOTP({
        phone: '+91' + value.toString(),
        body: 'Here your OTP - ' + res
      }).subscribe((res1: any) => {
        // console.log(res1);
      },err => console.error(err));
    }, err => console.error(err));
  }


  markerDragEnd($event: MouseEvent) {
    this.signUpForm.value['Location'] = ($event)['coords'];

    // console.log(($event)['coords']);
    this.latitude = $event['coords'].lat;
    this.longitude = $event['coords'].lng;
    this.signUpForm.patchValue({Latitude: this.latitude.toString()});
    this.signUpForm.patchValue({Longitude: this.longitude.toString()});
    // this.getAddress(this.latitude, this.longitude);
  }
  // getStoreAddress() {
  //   this.mapService.getLatLongFromAddress(this.address).subscribe((res: any) => {
  //     if(res['results'].length > 0) {
  //       this.locationError = '';
  //       const detail = res['results'][0];
  //       this.latitude = detail['geometry']['location']['lat'];
  //       this.longitude = detail['geometry']['location']['lng'];
  //       this.signUpForm.patchValue({Latitude: this.longitude});
  //       this.signUpForm.patchValue({Longitude: this.longitude});
  //     } else {
  //       this.locationError = 'Location not found'
  //     }
  //   }, err => {
  //     console.error(err);
  //   })
  // }

}
