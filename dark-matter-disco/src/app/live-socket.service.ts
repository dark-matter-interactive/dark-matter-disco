import { Injectable } from '@angular/core';
import io from 'socket.io-client';



@Injectable({
  providedIn: 'root'
})
export class LiveSocketService {

  constructor() { }

  socket: any = io();

  emit(event: string, ...data: any ) {
    this.socket.emit(event, ...data);
  }

  on(event: string, callback) {
    this.socket.on(event, (data) => {
      callback(data);
    })
  }

  getId(): string {
    return this.socket.id;
  }

}
