import { Injectable } from '@angular/core';
import { Direction } from './Enum';
import { Server } from './server/Server';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private server: Server) {
    
  }

  getEvents() {
    return this.server.getEvents();
  }

  on(name: string, func: any){
    this.server.on(name, func);
  }

  // АВТОРИЗАЦИЯ И РЕГИСТРАЦИЯ
  // -------------------------------
  login(user: User) {
    this.server.login(user);
  }

  registration(user: User) {
    this.server.registration(user);
  }

  sendMessage(message: String) {
    this.server.sendMessage(message);
  }

  logout() {
    this.server.logout();
  }

  logoutAllUsers(secretWord: string) {
    this.server.logoutAllUsers(secretWord);
  }

  createRoom(roomName: string) {
    this.server.createRoom(roomName);
  }

  joinGame(roomName: string) {
    this.server.joinGame(roomName);
  }

  leaveGame() {
    this.server.leaveGame();
  }

  getRooms() {
    this.server.getGames();
  }

  // ИГРА
  // -------------------------------
  move (direction: Direction): void {
    this.server.move(direction);
  }

  stopMove(): void {
    this.server.stopMove();
  }

  changeCameraRotation(rotationParams: object) {
    this.server.changeCameraRotation(rotationParams);
  }

  getNames() {
    this.server.getNames();
  }


  speedUp() {
    this.server.speedUp();
  }

  speedDown() {
    this.server.speedDown();
  }

  changePassword(login: string, oldPassword: string, newPassword: string) {
    this.server.changePassword(login, oldPassword, newPassword);
  }

}
