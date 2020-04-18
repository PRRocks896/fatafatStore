import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Utils } from 'src/app/shared/utils';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from 'src/app/shared/common.service';
import { UserformService } from './userform.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit {

  userform: FormGroup;
  latitude: number;
  longitude: number;
  zoom:number;
  locationError: String = '';
  address: any = '';
  constructor(private titleService: Title, private commonService: CommonService,
    private userService: UserformService, private router: Router) {
    this.titleService.setTitle('User Form' + Utils.getAppName());
  }

  ngOnInit(): void {
    this.setCurrentLocation();
    this.userform = new FormGroup({
      'orderdescription': new FormControl('', Validators.required),
      'firstname': new FormControl('', Validators.required),
      'lastname': new FormControl('', Validators.required),
      'phonenumber': new FormControl('', Validators.required),
      'retailerID': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'address1': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'state': new FormControl('', Validators.required),
      'pincode': new FormControl('', Validators.required),
      'latitude': new FormControl('', Validators.required),
      'longitude': new FormControl('', Validators.required),
      'location': new FormControl('', Validators.required)
    });
    this.userform.patchValue({retailerID: 7});
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
      
      this.userService.postOrder(this.userform.value).subscribe((res: any) => {
        // console.log(res);
        if(res['errorcode'] == '0')  {
          this.userform.reset();
          alert(res['message']);
          // this.router.navigate(['/']);
        } else {
          
          alert(res['message']);
        }
      }, err => console.error(err));
    } else {
      alert('Please fill all required detail')
    }
    
  }

  onVerifyOtp() {

  }

  onGetOtp() {

  }

  markerDragEnd($event: MouseEvent) {
    console.log(($event)['coords']);
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
