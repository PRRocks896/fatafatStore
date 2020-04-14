import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Utils } from 'src/app/shared/utils';

@Component({
  selector: 'app-storedetail',
  templateUrl: './storedetail.component.html',
  styleUrls: ['./storedetail.component.css']
})
export class StoredetailComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Store Detail' + Utils.getAppName());
  }

  ngOnInit(): void {
  }

}
