import { Component, OnInit } from '@angular/core';
import randomNames from '../assets/random-usernames';
import { LiveSocketService } from "./live-socket.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Dark Matter Disco';

  username: string = null;
  friendUsername: string = null;

  constructor (private liveSocketService: LiveSocketService) {}

  ngOnInit(){

     // select a random username 
    this.username = randomNames[Math.floor(Math.random() * randomNames.length)];

    // Send server username thru socket to link username and socket.id
    const socketService = this.liveSocketService;
    socketService.emit('user', this.username);

  }

}
