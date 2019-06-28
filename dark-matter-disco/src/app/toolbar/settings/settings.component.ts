import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  changeToSpace() {
    this.renderer.setStyle(document.body, 'background-image', "url('./assets/planet-cartoon-space-background.jpeg')");
  }

  changeToRanch() {
    this.renderer.setStyle(document.body, 'background-image', "url('./assets/farm-fields-minimal-flat-art-work-style_22350-732.jpg')");
  }

  changeToPineapple() {
    this.renderer.setStyle(document.body, 'background-image', "url('./assets/Pineapple.png')");
  }

}
