import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Utils } from '../shared/utils';
import { LoginService } from './login.service';
import { InventoryService } from '../shared/inventory.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommonService } from '../shared/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  imageURL: string = '';
  constructor(private router:Router, private titleService: Title, private loginService: LoginService,
    private inventoryService: InventoryService, private spinner: NgxSpinnerService,
    private commonService: CommonService) {
    this.titleService.setTitle('Login' + Utils.getAppName());
  }

  ngOnInit(): void {
    // this.inventoryService.getInventory('1').subscribe(res => {
    //   if(res['errorcode'] == '0') {
    //     this.imageURL = Utils.imageURLFront() + res['InventoryList'][1]['ItemImage'];
    //   }
    // }, err => console.error(err));
    this.loginForm = new FormGroup({
      'email': new FormControl('',),
      'password': new FormControl('',)
    });
  }

  onLogin() {
    if(Utils.checkTokenValid()) {
      this.spinner.show();
      let body = this.loginForm.value; // new FormData();
      this.loginService.doLogin(body).subscribe((res: any) => {
        this.spinner.hide();
        if(res['errorcode'] == '0') { 
          localStorage.setItem('retailer', JSON.stringify(res['StoreList'][0]));
          this.router.navigate(['retailer']);
        } else if(res['errorcode'] == '404') {
          alert(res['message']);
        }
      }, (err: any) => {
        this.spinner.hide();
        alert(err.error.message);
        console.error(err);
      })
    } else {
      this.commonService.getToken().subscribe((res: any) => {
        Utils.setToken(res);
        this.onLogin();
      })
    }
    
  }

}
