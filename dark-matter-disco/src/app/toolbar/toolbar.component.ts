import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { LiveSocketService } from '../live-socket.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  animations:  [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)', 'z-index': '-20'}),
        animate('200ms ease-in-out', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        style({'z-index': '-20'}),
        animate('200ms ease-in-out', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class ToolbarComponent implements OnInit {

  constructor(private liveSocketService: LiveSocketService) {
    
  }

  @Input() changeInvitee: any;
  @Input() changeVideoID: any;
  @Input() username: string;
  @Input() changeSkinName: any;
  @Input() skinName: string;
  @Input() userStars: number;

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
