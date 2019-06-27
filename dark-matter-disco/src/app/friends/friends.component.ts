import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
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
  // @Input() danceBuddies: any;
  // @Input() allUsers: any;
  // @Input() sendFriendRequest: any;
  // @Input() allRequests: any;
  // @Input() showFriendRequests: any;
  // @Input() showRequests: boolean;
  // @Input() acceptFriendRequest: any;
  // @Input() friends: any;
  // @Input() showFriends: boolean;
  // @Input() showNewFriends: any;
  // @Input() findFriends: any;

  allUsers: any = [];
  allRequests: any = [];
  customize: any = { color: '#f06' };
  showRequests: boolean = false;
  friends: any = [];
  showFriends: boolean = false;


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
  sendFriendRequest(username, friendName) {
    //add requests to database
    axios.post('/friend/request', {
      username,
      friendName
    })
  }

  showFriendRequests() {
    //get pending requests
    this.showRequests = true;
    axios.get(`/friend/request/${this.username}`).then((requests) => {
      this.allRequests = requests.data
      console.log(this.allRequests);
    })
  }
  acceptFriendRequest(username, friendName) {
    //trigger put request
    axios.put('/friend/request', {
      username,
      friendName
    });
  }

  showNewFriends() {
    this.showFriends = true;
    axios.get(`/friend/${this.username}`).then((requests) => {
      this.friends = requests.data
      console.log(this.allRequests);
    })
  }

  findFriends(username) {
    axios.get(`/user/${username}`).then((user) => {
      // console.log(user);
      if(Array.isArray(user)) {
        this.allUsers = user
      } else {
        this.allUsers = user.data;
      }
      console.log(this.allUsers);
    });
  }

  

}
