import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Utils } from '../shared/utils';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('Not Found' + Utils.getAppName());
  }

  ngOnInit(): void {
  }

}
