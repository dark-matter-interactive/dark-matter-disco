import { Component, OnInit, Input } from '@angular/core';
import { LiveSocketService } from '../live-socket.service';
//import axios to trigger server requests
import axios from 'axios';

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

  sendFriendRequest(toUsername) {
    this.changeInvitee(toUsername);
    console.log(toUsername, this.username)
    axios.post('/friend/request', {
      username: this.username,
      friendName: toUsername,
    })
  }

}
