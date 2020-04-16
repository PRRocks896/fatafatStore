import { Component } from '@angular/core';
import { CommonService } from './shared/Common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fatafat-store';

  constructor(private commonService: CommonService) {
    this.commonService.getToken().subscribe((res: any) => {
      console.log(res);
    },(err: any) => {
      console.error(err);
    })
  }
}
