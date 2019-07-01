import { Component, OnInit, Input, Output } from '@angular/core';
import { LiveSocketService } from '../live-socket.service';
import { ConfigService } from '../config.service';
<<<<<<< HEAD
import { StarService } from '../star.service';
=======
import { Subscription } from 'rxjs';
>>>>>>> 704475937bb7d4c199cde3f688a732aa4bab9a0f


@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {

<<<<<<< HEAD
  constructor(private liveSocketService: LiveSocketService, private configService: ConfigService, private starService: StarService) { }
=======
  private starsSubscription: Subscription
  constructor(private liveSocketService: LiveSocketService, private configService: ConfigService) { }
>>>>>>> 704475937bb7d4c199cde3f688a732aa4bab9a0f

  @Input() danceBuddies: any;
  @Input() username: any;
  @Input() gotStar: boolean;
  @Input() recievedStar: any;

  ngOnInit() {
    this.liveSocketService.on('stars', (toUsername, fromUsername) => {
      console.log(this.danceBuddies);
      let users = Object.keys(this.danceBuddies);
      if (users.includes(toUsername)) {
        this.star(toUsername);
        // this.danceBuddies[toUsername].gotStar = true;
      } else if (this.username === toUsername) {
        console.log(this.username, '2nd star cond', toUsername);
        this.recievedStar();
        // this.configService.addingStars(toUsername);
      }
      // this.configService.addingStars(toUsername);
      this.starService.giveStar(toUsername);
    })
  }

  addStar(username) {
    // let username = Object.keys(username)
    console.log('clicked adding star to ', username);
    this.star(username);
    this.configService.addingStars(username);
    this.liveSocketService.emit('stars', username, this.username);
  }

  star(username) {
    this.danceBuddies[username].gotStar = true;
    this.danceBuddies[username].starCount++;
    setTimeout(() => {
      this.danceBuddies[username].gotStar = false;
    }, 3000);
  }

  // lookupStars() {
  //   let users = Object.keys(this.danceBuddies);
  //   users.forEach((user) => {
  //     let stars = this.configService.getStarCount(user);
  //     this.danceBuddies[user].starCount = stars;
  //     console.log(this.danceBuddies);
  //   })
  // }

}
