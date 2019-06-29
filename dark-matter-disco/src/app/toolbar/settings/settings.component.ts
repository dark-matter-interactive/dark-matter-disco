<<<<<<< HEAD
import { Component, OnInit, Input } from '@angular/core';
=======
import { Component, OnInit, Renderer2 } from '@angular/core';
>>>>>>> 0599b4e0a9d3c98caf68a846c5801be031ae0b81

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  @Input() changeSkinName: any;

  ngOnInit() {
  }

<<<<<<< HEAD
  
=======
  changeToSpace() {
    this.renderer.setStyle(document.body, 'background-image', "url('./assets/planet-cartoon-space-background.jpeg')");
  }

  changeToRanch() {
    this.renderer.setStyle(document.body, 'background-image', "url('./assets/farm-fields-minimal-flat-art-work-style_22350-732.jpg')");
  }

  changeToPineapple() {
    this.renderer.setStyle(document.body, 'background-image', "url('./assets/Pineapple.png')");
  }
>>>>>>> 0599b4e0a9d3c98caf68a846c5801be031ae0b81

}
