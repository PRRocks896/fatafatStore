import { Component } from '@angular/core';
import { CommonService } from './shared/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fatafat-store';

  constructor(private commonService: CommonService) {
    this.commonService.getToken().subscribe((res: any) => {
      // console.log(res);
      localStorage.setItem('token', res['access_token']);
    },(err: any) => {
      alert(err.error.message);
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
