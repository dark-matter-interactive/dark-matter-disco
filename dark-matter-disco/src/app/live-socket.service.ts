import { Injectable } from '@angular/core';
import io from 'socket.io-client';



@Injectable({
  providedIn: 'root'
})
export class LiveSocketService {

  constructor() { }

  socket: any = io();

  /**
   * Simply calls socket.emit with a custom event and any number of arguments 
   * as data to pass
   * @param event (string) event name
   * @param data any number of arguments of data to send
   */
  emit(event: string, ...data: any ) {
    this.socket.emit(event, ...data);
  }

  on(event: string, callback) {
    this.socket.on(event, (...data) => {
      callback(...data);
    })
  }

  getId(): string {
    return this.socket.id;
  }

}
