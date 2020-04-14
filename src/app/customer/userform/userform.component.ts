import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Utils } from 'src/app/shared/utils';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit {

  userform: FormGroup;
  constructor(private titleService: Title) {
    this.titleService.setTitle('User Form' + Utils.getAppName());
  }

  ngOnInit(): void {
    this.userform = new FormGroup({
      'orderdescription': new FormControl('', Validators.required),
      'name': new FormControl('', Validators.required),
      'number': new FormControl('', Validators.required),
      'otp': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      // 'address': new FormGroup({
      //   'line1': new FormControl('', Validators.required),
      //   'line2': new FormControl('', Validators.required),
      //   'area': new FormControl('', Validators.required),
      //   'city': new FormControl('', Validators.required),
      //   'state': new FormControl('', Validators.required)
      // }),
      'pincode': new FormControl('', Validators.required),
      'location': new FormControl('', Validators.required)
    })
  }

  ValidateForm(formName) {
    return this.userform.get(formName)?.invalid && this.userform.get(formName)?.touched;
    // return this.formV.checkValidation(this.signinForm, formName);
}

  onSubmit() {
    console.log(this.userform.value);
  }

  onVerifyOtp() {

  }

  onGetOtp() {

  }

}
