import { Component, OnInit, Input } from '@angular/core';
import { LiveSocketService } from 'src/app/live-socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private liveSocketService: LiveSocketService) {
    // this.liveSocketService.on('chat', (username, message) => {
    //   console.log(username, message)
    //   this.convos.push({ username, message });
    // }); 
  }

  @Input() username: string;
  @Input() convos: any = [];
  @Input() skinName: string;

  message: string = '';

  sendMsg(message) {
    this.liveSocketService.emit('chat', this.username, message, this.skinName);
    this.convos.push({username: 'me', message, color: this.skinName})
    this.message = '';
  }

  ngOnInit() {
    this.liveSocketService.on('chat', (username, message, color) => {
      console.log(username, message)
      this.convos.push({ username, message, color });
    });
    
  }

}
