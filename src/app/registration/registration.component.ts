import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServerService } from '../server.service';

import { User } from '../user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class RegistrationComponent implements OnInit {

  user: User = {
    login: '',
    nickname: '',
    password: ''
  }

  EVENTS = this.serverService.getEvents();

  constructor(
    private router: Router,
    private serverService: ServerService,
    private cookieService: CookieService
    ) {
    serverService.on(this.EVENTS.REGISTRATION, (data: any) => this.onGetToken(data))
  }

  ngOnInit(): void {
  }

  registration() {
    this.serverService.registration(this.user);
  }

  onGetToken(token: String) {
    if (typeof token === 'string') {
      /* this.cookieService.set('token', token); */
      localStorage.setItem('token', token);
      this.router.navigate(['rooms']);
    }
  }

}
