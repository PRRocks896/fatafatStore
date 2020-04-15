import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl('',),
      'password': new FormControl('',)
    });
  }

  onLogin() {
    this.router.navigate(['retailer']);
  }

  onRegister() {
    this.router.navigate(['registration']);
  }

}
