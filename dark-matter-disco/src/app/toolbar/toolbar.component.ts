import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor() { }

  isOpen: boolean = false;
  whichToolbar: string = '';

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
