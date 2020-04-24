import { Component } from '@angular/core';
import { CommonService } from './shared/common.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fatafat-store';

  constructor(private commonService: CommonService, private spinner: NgxSpinnerService) {
    this.spinner.show();
    this.commonService.getToken().subscribe((res: any) => {
      // console.log(res);
      this.spinner.hide();
      localStorage.setItem('token', res['access_token']);
    },(err: any) => {
      this.spinner.hide();
      // alert(err.error.message);
      console.error(err);
    })
    
    // this.commonService.sendMsg({
    //   phone: '+919904198433',
    //   body: 'Your OTP is 5432'
    // }).subscribe((res: any) => {
    //   console.log(res);
    // }, err => console.error(err));

  }
}
