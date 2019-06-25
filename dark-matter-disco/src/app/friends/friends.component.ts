import { Component, OnInit, Input } from '@angular/core';
import { LiveSocketService } from '../live-socket.service';
//import axios to trigger server requests
import axios from 'axios';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  constructor(private liveSocketService: LiveSocketService) { }

  onlineUsers: string[] = [];

  @Input() changeInvitee: any;
  @Input() username: string;
  @Input() danceBuddies: any;
  @Input() allUsers: any;


  ngOnInit() {
    this.liveSocketService.emit('who online', 'please')
    this.liveSocketService.on('who online', (onlineUsers) => {
      this.onlineUsers = onlineUsers.filter((name: string) => name !== this.username);
    });
  }

  sendInvite(toUsername) {
    console.log('SENDING INVITE TO', toUsername)
    this.liveSocketService.emit('invite', this.username, toUsername);
    this.changeInvitee(toUsername);
    
  }

  

}
