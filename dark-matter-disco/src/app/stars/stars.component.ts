import { Component, OnInit, Input, Output } from '@angular/core';
import { LiveSocketService } from '../live-socket.service';
import { httpService } from '../config.service';
import { StarService } from '../star.service';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {

  constructor(private liveSocketService: LiveSocketService, private configService: httpService, private starService: StarService) { }

  @Input() danceBuddies: any;
  @Input() username: any;
  @Input() gotStar: boolean;
  @Input() recievedStar: any;

  ngOnInit() {
    // determining who in the party got the star and displaying it for user to see
    this.liveSocketService.on('stars', (toUsername) => {
      let users = Object.keys(this.danceBuddies);
      if (users.includes(toUsername)) {
        this.star(toUsername);
      } else if (this.username === toUsername) {
        this.recievedStar();
      }
      this.starService.giveStar(toUsername)
    })
  }

  // function for adding stars, calls star function, bound to addStar button.
  addStar(username) {
    this.star(username);
    this.configService.addingStars(username);
    this.liveSocketService.emit('stars', username, this.username);
    this.starService.giveStar(username)
  }

  // function called when addStar button is pressed, changes danceBuddies properties and increments the count
  star(username) {
    this.danceBuddies[username].gotStar = true;
    this.danceBuddies[username].starCount++;
    setTimeout(() => {
      this.danceBuddies[username].gotStar = false;
    }, 500);
  }

}
