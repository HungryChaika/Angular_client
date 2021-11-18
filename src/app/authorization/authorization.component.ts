import { Component, Host, HostListener, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServerService } from '../server.service';

import { User } from '../user';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css'],
})
export class AuthorizationComponent implements OnInit {

  user: User = {
    login: '',
    password: ''
  }

  EVENTS = this.serverService.getEvents();

  constructor(
    private router: Router,
    private serverService: ServerService,
    private cookieService: CookieService
  ) {
    serverService.on(this.EVENTS.LOGIN, (data: any) => this.onGetToken(data))
  }

  ngOnInit(): void {
    // this.cookieService.get('token') ? this.serverService.login(this.user) : null;
  }

  authorization() {
    this.serverService.login(this.user);
    delete this.user.password;
  }

  onGetToken(data: any) {
    if (data.result && typeof data.token === 'string') {
      localStorage.setItem('token', data.token);
      this.router.navigate(['rooms']);
    }
  }
}
