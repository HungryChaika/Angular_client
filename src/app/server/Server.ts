import { io } from "socket.io-client";
import { Md5 } from "ts-md5/dist/md5";

import { SETTINGS } from "./Settings";
import { User } from '../user';


export class Server {

    HOST = SETTINGS.HOST;
    PORT = SETTINGS.PORT;
    MESSAGES = SETTINGS.MESSAGES;

    socket;

    constructor() {
      
      this.socket = io(`${this.HOST}:${this.PORT}`);
      if (this.socket) {
        console.log('socket connected');
      };

      // authorization
      this.socket.on(this.MESSAGES.LOGIN, data => {
        if (data) {
          localStorage.setItem('token', data);
        }
      });

      // registration
      this.socket.on(this.MESSAGES.REGISTRATION, data => {
        localStorage.setItem('token', data);
      });
    }

    login = (user: User) => {
      const { login, password } = user;
      if (login && password) {
        const num = Math.round(Math.random() * 1000000);
        const passHash = Md5.hashStr(login + password);
        const token = Md5.hashStr(passHash + String(num));
        this.socket.emit(this.MESSAGES.LOGIN, { login, passHash, token, num });
      }
    }

    registration = (user: User) => {
      const { login, nickname, password } = user;
      if (nickname && login && password) {
        const num = Math.round(Math.random() * 1000000);
        const passHash = Md5.hashStr(login + password);
        const token = Md5.hashStr(passHash + String(num));
        this.socket.emit(this.MESSAGES.REGISTRATION, { login, nickname, passHash, token, num });
      }
    }
}
