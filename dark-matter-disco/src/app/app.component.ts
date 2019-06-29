import { Component, OnInit, SimpleChanges } from '@angular/core';
import randomNames from '../assets/random-usernames';
import { LiveSocketService } from "./live-socket.service";
import axios from 'axios';
import { Subject, Subscription } from 'rxjs';
import { ConfigService } from './config.service';


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
  stars: number;
  userStars: number;
  // allUsers: any = [];
  // allRequests: any = [];
  // customize: any = { color: '#f06' };
  // showRequests: boolean = false;
  // friends: any = [];
  // showFriends: boolean = false;

  private starsSubscription: Subscription;
  constructor (private liveSocketService: LiveSocketService, private configService: ConfigService) {}


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

    this.liveSocketService.on('invite accepted', (friendUsername: string, friendStars) => {
      console.log('invite accepted from', friendUsername, friendStars);
      this.starsSubscription = this.configService.getStarCount(friendUsername).subscribe((res) => {
        console.log('res', res);
        this.stars = res[0].starsTotal;
        this.danceBuddies[friendUsername] = {watch: true, poseStream: new Subject(), gotStar: false, starCount: this.stars};
      }, (err) => console.error(err), () => {});
      this.hasJoined = true//friendUsername;
      this.inviteeUsername = null;
    })

    this.liveSocketService.on('guests', (guests) => {
      // console.log('guests', guests);
      let usernames = Object.keys(this.danceBuddies);
      guests.forEach((guest) => {
        console.log(guest);
        if (!usernames.includes(guest) && this.username !== guest) {
          this.starsSubscription = this.configService.getStarCount(guest).subscribe((res) => {
            console.log('res', res);
            this.stars = res[0].starsTotal;
            this.danceBuddies[guest] = {watch: true, poseStream: new Subject(), gotStar: false, starCount: this.stars};
          }, (err) => console.error(err), () => {});
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

    axios.get(`/user/${this.username}`).then((response) => {
      console.log('on init', response);
      this.userStars = response.data[0].starsTotal;
    }).catch(err => console.error(err));

  }

  acceptInvite() {
    console.log('you accepted invite from', this.hostUsername)
    // this.danceBuddies[this.hostUsername] = {watch: true, poseStream: new Subject(), gotStar: false};
    this.liveSocketService.emit('accept invite', this.username, this.hostUsername, this.userStars);
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
    this.userStars++;
    setTimeout(() => {
      this.gotStar = false;
    }, 3000);
    // this.starsSubscription = this.configService.getStarCount(this.username).subscribe((res) => {
    //   console.log('res', res);
    //   this.userStars = res[0].starsTotal;
    //   console.log(this.userStars);
    // }, (err) => console.error(err), () => {});
    // console.log(this.userStars);
  }
  
  changeSkinName = (skinName) => {
    this.skinName = skinName;
  }


}
