import { Component, OnInit, Input } from '@angular/core';
import { LiveSocketService } from '../live-socket.service';
import { ConfigService } from '../config.service';


@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.css']
})
export class StarsComponent implements OnInit {

  constructor(private liveSocketService: LiveSocketService, private configService: ConfigService) { }

  @Input() danceBuddies: any;

  ngOnInit() {
  }

  addStar(username) {
    // let username = Object.keys(username)
    console.log('clicked adding star to ', username);
    this.configService.addingStars(username);
  }

}
