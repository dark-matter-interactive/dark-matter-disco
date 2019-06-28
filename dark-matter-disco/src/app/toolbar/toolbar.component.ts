import { Component, OnInit, Input } from '@angular/core';
import { LiveSocketService } from '../live-socket.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private liveSocketService: LiveSocketService) {
    this.liveSocketService.on('chat', (username, message) => {
      console.log(username, message)
      this.convos.push({ username, message });
    }); 
  }

  @Input() changeInvitee: any;
  @Input() changeVideoID: any;
  @Input() username: string;

  isOpen: boolean = false;
  whichToolbar: string = '';
  convos: any = [];

  iconClick(whichToolbar: string) {
    if (!this.isOpen) {
      this.isOpen = !this.isOpen;
    } else if (this.whichToolbar === whichToolbar) {
      this.isOpen = !this.isOpen;
    }
    this.whichToolbar = whichToolbar;
  }

  ngOnInit() {
  }

}
