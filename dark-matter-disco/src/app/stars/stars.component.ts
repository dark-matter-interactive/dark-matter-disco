import { Component, OnInit, Input, Output } from '@angular/core';
import { LiveSocketService } from '../live-socket.service';
import { ConfigService } from '../config.service';
import { StarService } from '../star.service';
import { Subscription } from 'rxjs';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';



@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {

  constructor(private toastr: ToastrService, private liveSocketService: LiveSocketService, private configService: ConfigService, private starService: StarService) { }

  @Input() danceBuddies: any;
  @Input() username: any;
  @Input() gotStar: boolean;
  @Input() recievedStar: any;
  @Input() showSuccess: any;

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
      // this.danceBuddies[toUsername].gotStar = true;
      // this.danceBuddies[toUsername].starCount++;
      this.starService.giveStar(toUsername);
    })
  }

  addStar(username) {
    // let username = Object.keys(username)
    console.log('clicked adding star to ', username);
    this.star(username);
    this.configService.addingStars(username);
    this.liveSocketService.emit('stars', username, this.username);
    this.starService.giveStar(username)
  }

  star(username) {
    this.showSuccess()
    this.danceBuddies[username].gotStar = true;
    this.danceBuddies[username].starCount++;
    setTimeout(() => {
      this.danceBuddies[username].gotStar = false;
    }, 500);
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
