import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor() { }

  @Input() changeInvitee: any;
  @Input() username: string;

  isOpen: boolean = true;
  whichToolbar: string = 'friends';

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
