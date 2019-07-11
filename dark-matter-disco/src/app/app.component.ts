import { Component, OnInit } from '@angular/core';
import randomNames from '../assets/random-usernames';
import { LiveSocketService } from "./live-socket.service";
import axios from 'axios';
import { Subject, Subscription } from 'rxjs';
import { StarService } from './star.service';
import { httpService } from './config.service';
import { ToastrService } from 'ngx-toastr';


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
  skinName: string = 'yellow';
  stars: number;
  userStars: number;
  achievements: any = [];

  private starsSubscription: Subscription;
  constructor (private toastr: ToastrService, private liveSocketService: LiveSocketService, private starService: StarService, private configService: httpService) {}


  ngOnInit(){
    
    //init star service
    this.starService.init(this.danceBuddies);

     // select a random username 
    this.username = randomNames[Math.floor(Math.random() * randomNames.length)];

    // Send server username thru socket to link username and socket.id
    this.liveSocketService.emit('user', this.username);
    this.liveSocketService.on('user', () => {
      this.liveSocketService.emit('user', this.username);
    });

    // listen for invites
    this.liveSocketService.on('invite', (friendUsername: string) => {
      this.hostUsername = friendUsername;
    });

    // listen for invite accepted, add user to dance buddies object, get starCount for friend
    this.liveSocketService.on('invite accepted', (friendUsername: string, friendStars) => {
      console.log('invite accepted from', friendUsername, friendStars);
      this.starsSubscription = this.configService.getStarCount(friendUsername).subscribe((res) => {
        this.stars = res[0].starsTotal;
        this.danceBuddies[friendUsername] = {watch: true, poseStream: new Subject(), gotStar: false, starCount: this.stars};
      }, (err) => console.error(err), () => {});
      this.hasJoined = true//friendUsername;
      this.inviteeUsername = null;
    })

    // refers to when more than one additional person in party, adds user to danceBuddies object, gets guests starCount
    this.liveSocketService.on('guests', (guests) => {
      let usernames = Object.keys(this.danceBuddies);
      guests.forEach((guest) => {
        if (!usernames.includes(guest) && this.username !== guest) {
          this.starsSubscription = this.configService.getStarCount(guest).subscribe((res) => {
            this.stars = res[0].starsTotal;
            this.danceBuddies[guest] = {watch: true, poseStream: new Subject(), gotStar: false, starCount: this.stars};
          }, (err) => console.error(err), () => {});
          }
        })
    })


    //store logged in user to database
    axios.post('/user/login', {
      username: this.username
    })

    // get userStar count from database for signed in user
    axios.get(`/user/${this.username}`).then((response) => {
      this.userStars = response.data[0].starsTotal;
    }).catch(err => console.error(err));
    
    // gets signed in user's unlocked achievements, adds badgeURLs to array that is displayed under username
    this.configService.userAchievements(this.username).subscribe((response) => {
      this.achievements = response;
    })


  }
  showSuccess(achievementName, url) {
    this.toastr.success(`Achievement Unlocked! ${achievementName}`, `<img src=${url}></img>`);
  }

  // function uses websockets to send information on acceptance of invite, allows user to be added to session
  acceptInvite() {
    this.liveSocketService.emit('accept invite', this.username, this.hostUsername, this.userStars);
    this.hasJoined = true; // this.hostUsername;
    this.hostUsername = null;
  }

  changeInvitee = (username) => {
    this.inviteeUsername = username;
  }

  // changes videoID for YouTube API player
  changeVideoID = (videoID) => {
    this.videoID = videoID;
  }
  
  // Displays star signalling another user gave a star, updates userStar count, checks in any new achievements have been unlocked
  // checks for achievements by seeing if starThreshold has been hit by userStar
  // if achievement unlocked shows badgeURL as well as Toast with achievement name
  recievedStar = () => {
    this.gotStar = true;
    this.userStars++;
    setTimeout(() => {
      this.gotStar = false;
    }, 3000)
      this.configService.recieveAchievement().subscribe((res: Array<any>) => {
        res.forEach((item) => {
          if (this.userStars === item.starsThreshold) {
            this.showSuccess(item.name, item.badgeURL);
            this.achievements.push(item.badgeURL)
            this.configService.updateAchievements(this.username, item.id).subscribe();
          }
        })
      })
  }
  
  // changes skin for user avatar
  changeSkinName = (skinName) => {
    this.skinName = skinName;
  }

  // changes user on Google login, updates username, stars, and achievements.
  changeUser = (username, stars) => {
    const oldName = this.username;
    this.username = username;
    this.liveSocketService.emit('change user', oldName, this.username);
    this.userStars = stars;
    this.achievements = [];
    this.configService.userAchievements(this.username).subscribe((response) => {
      this.achievements = response;
    })
  }


}
