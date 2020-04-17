import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Utils } from '../shared/utils';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router:Router, private titleService: Title, private loginService: LoginService) {
    this.titleService.setTitle('Login' + Utils.getAppName());
  }

  ngOnInit(): void {
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
      console.log(res);
      this.router.navigate(['retailer']);
    }, (err: any) => {
      console.error(err);
    })
    
  }

}
