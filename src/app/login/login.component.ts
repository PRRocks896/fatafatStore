import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Utils } from '../shared/utils';
import { LoginService } from './login.service';
import { InventoryService } from '../shared/inventory.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  imageURL: string = '';
  constructor(private router:Router, private titleService: Title, private loginService: LoginService,
    private inventoryService: InventoryService) {
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
    console.log(this.loginForm.value);

    let body = this.loginForm.value; // new FormData();
    // body.append('Email', this.loginForm.value.email);
    // body.append('Password', this.loginForm.value.password);
    this.loginService.doLogin(body).subscribe((res: any) => {
      // console.log(res);
      // this.imageURL = 'data:image/jpg;base64,' + res['StoreList'][0]['StoreImage']; 
      if(res['errorcode'] == '0') { 
        this.router.navigate(['retailer']);
      }
    }, (err: any) => {
      console.error(err);
    })
    
  }

}
