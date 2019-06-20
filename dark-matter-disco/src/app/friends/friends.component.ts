import { Component, OnInit, Input } from '@angular/core';
import { LiveSocketService } from '../live-socket.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  constructor(private liveSocketService: LiveSocketService) { }

  onlineUsers: string[] = [];

  @Input() changeFriend: any;
  @Input() username: string;

  ngOnInit() {
    this.liveSocketService.emit('who online', 'please')
    this.liveSocketService.on('who online', (onlineUsers) => {
      this.onlineUsers = onlineUsers;
      console.log(onlineUsers)
    });
  }

  sendInvite(toUsername) {
    this.liveSocketService.emit('invite', this.username, toUsername);
    // this.changeFriend(username);
  }

}
