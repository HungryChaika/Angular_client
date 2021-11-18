import { getLocaleDayNames } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  EVENTS = this.serverService.getEvents();
  games: any[] = [];
  roomName: string =  "";
  secretWord: string = ""; // кодовое слово для разлогина всех игроков

  constructor(
    private router: Router,
    private serverService: ServerService,
    private cookieService: CookieService
  ) {
    serverService.on(this.EVENTS.CREATE_ROOM, (result: boolean) => this.onCreateRoom(result));
    serverService.on(this.EVENTS.JOIN_GAME, (result: any) => this.onJoinGame(result));
    serverService.on(this.EVENTS.GET_GAMES, (result: any) => this.onGetGames(result));
    serverService.on(this.EVENTS.GET_NAMES, (result: any) => this.onGetNames(result));
  }

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['authorization']);
    } else {
      this.serverService.getRooms();
    }
  }

  getNames() {
    this.serverService.getNames();
  }

  onGetNames(data: any) {
    console.log(data);
  }

  onCreateRoom(data: any): void {
    localStorage.setItem('room', data.room);
    data ? this.router.navigate(['game']) : null;
  }

  createRoom() {
    this.roomName ? this.serverService.createRoom(this.roomName) : null;
  }

  onJoinGame(data: any) {
    if (data.result) {
      localStorage.setItem('game', String(data.gameName));
      this.router.navigate(['game']);
    }
  }

  joinGame(gameName: string) {
    gameName ? this.serverService.joinGame(gameName) : null;
  }

  getRooms() {
    this.serverService.getRooms();
  }

  onGetGames(games: object[]) {
    this.games = games;
  }

  logoutAllUsers() {
    this.serverService.logoutAllUsers(this.secretWord);
  }

}
