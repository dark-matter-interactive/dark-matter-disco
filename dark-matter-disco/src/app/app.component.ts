import { Component, OnInit } from '@angular/core';
import randomNames from '../assets/random-usernames';
import { LiveSocketService } from "./live-socket.service";
import axios from 'axios';
import { Subject } from 'rxjs';
import { StarService } from './star.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Dark Matter Disco';

  username: string = null; 
  hasJoined: boolean = false;
  hostUsername: string = null;
  inviteeUsername: string = null;
  danceBuddies: any = {};
  videoID: string = '';
  gotStar: boolean = false;
  skinName: string = 'stick man';
  // allUsers: any = [];
  // allRequests: any = [];
  // customize: any = { color: '#f06' };
  // showRequests: boolean = false;
  // friends: any = [];
  // showFriends: boolean = false;

  constructor (private liveSocketService: LiveSocketService, private starService: StarService) {}


  ngOnInit(){

    //init star service
    this.starService.init(this.danceBuddies);

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
      this.danceBuddies[friendUsername] = {watch: true, poseStream: new Subject(), gotStar: false};
      this.hasJoined = true; //friendUsername;
      this.inviteeUsername = null;
    })

    this.liveSocketService.on('guests', (guests) => {
      // console.log('guests', guests);
      let usernames = Object.keys(this.danceBuddies);
      guests.forEach((guest) => {
        // console.log(guest, usernames);
        if (!usernames.includes(guest) && this.username !== guest) {
          this.danceBuddies[guest] = {watch: true, poseStream: new Subject(), gotStar: false};
        }
      })
      // console.log(this.danceBuddies);
    })

    //store logged in user to database
    axios.post('/user/login', {
      username: this.username
    })

    // //get list of all users
    // axios.get(`/user/login`).then((users) => {
    //   this.allUsers = users.data;
    // });

  }

  acceptInvite() {
    console.log('you accepted invite from', this.hostUsername)
    this.danceBuddies[this.hostUsername] = {watch: true, poseStream: new Subject(), gotStar: false};
    this.liveSocketService.emit('accept invite', this.username, this.hostUsername)
    this.hasJoined = true; // this.hostUsername;
    // this.danceBuddies[this.hostUsername] = new Subject();
    this.hostUsername = null;
  }

  changeInvitee = (username) => {
    this.inviteeUsername = username;
    // console.log(this.friendUsername);
  }

  changeVideoID = (videoID) => {
    this.videoID = videoID;
  }

  recievedStar = () => {
    this.gotStar = true;
    setTimeout(() => {
      this.gotStar = false;
    }, 3000)

  }
  
  changeSkinName = (skinName) => {
    this.skinName = skinName;
  }

}
