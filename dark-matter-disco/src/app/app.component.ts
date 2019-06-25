import { Component, OnInit } from '@angular/core';
import randomNames from '../assets/random-usernames';
import { LiveSocketService } from "./live-socket.service";
import axios from 'axios';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Dark Matter Disco';

  username: string = null;
  friendUsername: string = null;
  hostUsername: string = null;
  inviteeUsername: string = null;
  danceBuddies: any = {};

  customize: any = { color: '#f06' };

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
      this.hostUsername = friendUsername;
      console.log('invite from', friendUsername)
    });

    this.liveSocketService.on('invite accepted', (friendUsername: string) => {
      console.log('invite accepted from', friendUsername);
      this.friendUsername = 'bananas'//friendUsername;
      this.inviteeUsername = null;
    })

    //store logged in user to database
    axios.post('/user/login', {
      username: this.username
    })

  }

  acceptInvite() {
    console.log('you accepted invite from', this.hostUsername)
    this.liveSocketService.emit('accept invite', this.username, this.hostUsername)
    this.friendUsername = 'bananas'// this.hostUsername;
    // this.danceBuddies[this.hostUsername] = new Subject();
    this.hostUsername = null;
  }

  changeInvitee = (username) => {
    this.inviteeUsername = username;
    // console.log(this.friendUsername);
  }

}
