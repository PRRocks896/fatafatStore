import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Utils } from 'src/app/shared/utils';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/shared/common.service';
import { UserformService } from './userform.service';
import { Router } from '@angular/router';
import { MapsAPILoader, MouseEvent } from '@agm/core';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit {

  userform: FormGroup;
  latitude:number = 26.5123;
  longitude:number = 80.2329;
  zoom:number = 15;
  geoCoder;
  locationError: String = '';
  address: any = '';
  stateDetail: any;

  storeIamge: any;
  edited = false;
  url:any = '';
  OTP: any = '';
  OTPVerify = false;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(private titleService: Title, private commonService: CommonService,
    private userService: UserformService, private router: Router,
    private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
    this.titleService.setTitle('User Form' + Utils.getAppName());
  }

  ngOnInit(): void {
    // this.setCurrentLocation();
    this.getState();
    this.userform = new FormGroup({
      'ItemName': new FormControl('', Validators.required),
      'FirstName': new FormControl('', Validators.required),
      'LastName': new FormControl('', Validators.required),
      'PhoneNumber': new FormControl('', [Validators.required, 
        Validators.pattern('[0-9]*'),
        Validators.min(0), Validators.maxLength(10),
        Validators.minLength(10)]),
      'RetailerID': new FormControl('1', Validators.required),
      'Address': new FormControl('', Validators.required),
      'Address1': new FormControl('', Validators.required),
      'City': new FormControl('', Validators.required),
      'StateID': new FormControl('', Validators.required),
      'PinCode': new FormControl('', Validators.required),
      'otp': new FormControl('',),
      'Latitude': new FormControl('', Validators.required),
      'Longitude': new FormControl('', Validators.required),
    });
    this.userform.patchValue({retailerID: 7});
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      // this.setCurrentLocation();
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
          this.userform.patchValue({Latitude: this.longitude.toString()});
          this.userform.patchValue({Longitude: this.longitude.toString()});
          this.userform.patchValue({Location: place.formatted_address});
          this.zoom = 12;
        });
      });
    });
  }

  getState() {
    this.commonService.getState().subscribe((res: any) => {
      if(res.errorcode == '0') {
        this.stateDetail = res.StateList;
        // console.log(this.stateDetail);
      } else {
        alert(res.message);
      }
    }, err => console.error(err));
  }

  addState(stateID) {
    // console.log(stateID);
    this.userform.patchValue({StateID: stateID});
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
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  ValidateForm(formName) {
    return this.userform.get(formName)?.invalid && this.userform.get(formName)?.touched;
    // return this.formV.checkValidation(this.signinForm, formName);
}

  onSubmit() {
    // console.log(this.userform.value);
    if(this.userform.valid) {
      
      this.userService.postOrder(this.userform.value, this.storeIamge).subscribe((res: any) => {
        // console.log(res);
        if(res['errorcode'] == '0')  {
          this.userform.reset();
          alert(res['message']);
          this.router.navigate(['/']);
        } else {
          
          alert(res['message']);
        }
      }, err => console.error(err));
    } else {
      alert('Please fill all required detail')
    }
    
  }

  onVerifyOtp() {
    const enteredOTP = this.userform.value.otp;
    if(enteredOTP == this.OTP) {
      this.OTPVerify = true;
      alert('OTP Verified');
    } else {
      alert('OTP does not match');
    }
  }

  onGetOtp() {
    // console.log(this.userform.value.phonenumber);
    this.commonService.getOTP().subscribe((res: any) => {
      // console.log(res);
      this.OTP = res.toString();
      const value = this.userform.value.PhoneNumber;
      // console.log(value);
      this.commonService.sendOTP({
        phone: '+91' + value.toString(),
        body: 'Here your OTP - ' + res
      }).subscribe((res1: any) => {
        // console.log(res1);
      },err => console.error(err));
    }, err => console.error(err));
    // const value = this.userform.value.phonenumber;
    // const len = value.toString().length;
    // if(len == 10) {
    //   var length = 4, // length of generated password
    //   charset = '0123456789', // character set of autogenerated password
    //   retVal = "";
    //   for (var i = 0, n = charset.length; i < length; ++i) {
    //     retVal += charset.charAt(Math.floor(Math.random() * n));
    //   }
    //   this.userform.patchValue({otp: retVal});
    // } else {
    //   alert('Phonenumber must be 10 digit');
    // }
  }

  markerDragEnd($event: MouseEvent) {
    // console.log(($event)['coords']);
    this.latitude = $event['coords'].lat;
    this.longitude = $event['coords'].lng;
    this.userform.patchValue({latitude: this.longitude});
    this.userform.patchValue({longitude: this.longitude});
    // this.getAddress(this.latitude, this.longitude);
  }

  getAddress() {
    // console.log(this.address);
    this.commonService.getLatLongFromAddress(this.address).subscribe((res: any) => {
      if(res['results'].length > 0) {
        this.locationError = '';
        const detail = res['results'][0];
        this.latitude = detail['geometry']['location']['lat'];
        this.longitude = detail['geometry']['location']['lng'];
        // console.log(this.latitude);
        // console.log(this.longitude);
        this.userform.patchValue({latitude: this.longitude});
        this.userform.patchValue({longitude: this.longitude});
      } else {
        this.locationError = 'Location not found'
      }
    }, (err: any) => {
      console.error(err);
    })
  }

}
