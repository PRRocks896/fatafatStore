import { Component } from '@angular/core';
import { CommonService } from './shared/common.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Utils } from './shared/utils';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fatafat-store';

  constructor(private commonService: CommonService, private spinner: NgxSpinnerService,
    private title1: Title) {
    this.title1.setTitle('Fatafat.store');
    this.spinner.show();
    // if(!Utils.checkTokenValid()) {
      this.commonService.getToken().subscribe((res: any) => {
        // console.log(res);
        Utils.setToken(res);
        this.spinner.hide();
      },(err: any) => {
        this.spinner.hide();
        // alert(err.error.message);
        console.error(err);
      });
    // }
  }
}
