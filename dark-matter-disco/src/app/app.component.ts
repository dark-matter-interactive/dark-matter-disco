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
  inviteUsername: string = null;

  constructor (private liveSocketService: LiveSocketService) {}

  ngOnInit(){

     // select a random username 
    this.username = randomNames[Math.floor(Math.random() * randomNames.length)];

    // Send server username thru socket to link username and socket.id
    // const socketService = this.liveSocketService;
    this.liveSocketService.emit('user', this.username);
    this.liveSocketService.on('user', () => {
      this.liveSocketService.emit('user', this.username);
    })

    // listen for invites
    this.liveSocketService.on('invite', (friendUsername: string) => {
      this.inviteUsername = friendUsername;
      console.log('invite from', friendUsername)
    });

    this.liveSocketService.on('invite accepted', (friendUsername: string) => {
      console.log('invite accepted from', friendUsername);
      this.friendUsername = friendUsername;
    })

  }

  acceptInvite() {
    console.log('you accepted invite from', this.inviteUsername)
    this.liveSocketService.emit('accept invite', this.username, this.inviteUsername)
    this.friendUsername = this.inviteUsername;
  }

  changeFriend = (username) => {
    this.friendUsername = username;
    console.log(this.friendUsername);
  }

}
