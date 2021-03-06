import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void { }

  onShowMap() {
    this.router.navigate(['map']);
  }

  onLogin() {
    this.router.navigate(['login']);
  }

  onRegister() {
    this.router.navigate(['registration']);
  }

}
