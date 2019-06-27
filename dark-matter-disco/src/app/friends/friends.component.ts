import { Component, OnInit, Input, SimpleChanges, ApplicationRef } from '@angular/core';
import { LiveSocketService } from '../live-socket.service';
import { FriendsService } from '../friends.service';
//import axios to trigger server requests
import axios from 'axios';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {


  
  constructor(appRef: ApplicationRef, private liveSocketService: LiveSocketService, private friendsService: FriendsService) { }

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
    console.log('ngOnInit');
    this.liveSocketService.emit('who online', 'please')
    this.liveSocketService.on('who online', (onlineUsers) => {
      this.onlineUsers = onlineUsers.filter((name: string) => name !== this.username);
    });
    this.friendsService.getRequests(this.username)
      .subscribe((requests) => {
        this.showRequests = true;
        this.allRequests = requests
        // console.log(this.allRequests, 'requests');
      });
    this.friendsService.getFriends(this.username).subscribe((friendsList) => {
      this.friends = friendsList;
      console.log(this.friends, 'friends');
    })
    
  }
  ngAfterViewInit() {
    this.friendsService.getRequests(this.username)
    .subscribe((requests) =>{
      this.showRequests = true;
      this.allRequests = requests
      // console.log(this.allRequests, 'requests');
    });
  }


  
  sendInvite(toUsername) {
    console.log('SENDING INVITE TO', toUsername)
    this.liveSocketService.emit('invite', this.username, toUsername);
    this.changeInvitee(toUsername);
    
  }
  sendFriendRequest(username, friendName) {
    //add requests to database
    console.log(username, friendName);
    let body = {
      "username": username,
      "friendName": friendName,
    }
    this.friendsService.addRequests(body).subscribe();
    this.friendsService.getRequests(this.username)
      .subscribe((requests) =>{
        this.showRequests = true;
        this.allRequests = requests
        console.log(this.allRequests, 'requests');
      });
  }

  showFriendRequests() {
    //get pending requests
    this.showRequests = true;
    // axios.get(`/friend/request/${this.username}`).then((requests) => {
    //   this.allRequests = requests.data
    //   console.log(this.allRequests);
    // })
    this.friendsService.getRequests(this.username)
      .subscribe((requests) =>{
        this.allRequests = requests
      });
  }
  acceptFriendRequest(username, friendName) {
    //trigger put request
    let body = {
      username,
      friendName,
    }
    // axios.put('/friend/request', {
    //   username,
    //   friendName
    // });
    this.friendsService.acceptFriends(body)
      .subscribe(); 
  }

  showNewFriends() {
    this.showFriends = true;
    axios.get(`/friend/${this.username}`).then((requests) => {
      this.friends = requests.data
      console.log(this.allRequests);
    })
  }

  findFriends(username) {
    this.friendsService.searchUsers(username)
      .subscribe((response: any) => {
        console.log(response, 'response');
        this.allUsers = response;
      })
    console.log(this.allUsers, 'results');
    // axios.get(`/user/${username}`).then((user) => {
    //   // console.log(user);
    //   if(Array.isArray(user)) {
    //     this.allUsers = user
    //   } else {
    //     this.allUsers = user.data;
    //   }
    //   console.log(this.allUsers);
    // });
  }

  

}
