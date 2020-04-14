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

  signUpForm:FormGroup;

  constructor(private titleService: Title) {
    this.titleService.setTitle('Registration Retailer' + Utils.getAppName());
  }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'shopName': new FormControl('',),
      'password': new FormControl('',),
      'ownerName': new FormControl('',),
      'shopAddress': new FormControl('',),
      'pincode': new FormControl('',),
      'email': new FormControl('',),
      'number': new FormControl(''),
      'otp': new FormControl(''),
      'deliveryMedium': new FormControl('',)
    });
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

}
