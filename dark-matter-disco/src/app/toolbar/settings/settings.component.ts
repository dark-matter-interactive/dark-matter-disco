import { Component, OnInit, Input, Renderer2, OnChanges } from "@angular/core";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit, OnChanges {
  constructor(private renderer: Renderer2) {}

  @Input() changeSkinName: any;
  @Input() userStars: number;


  color: any;

  ngOnInit() {}

  ngOnChanges(changes) {
    console.log(changes);
  }

  changeBackground(e) {
    console.log(e);
    if(e === "Space") {
      this.renderer.setStyle(document.body, 'background-image', "url('./assets/planet-cartoon-space-background.jpeg')");
    } 
    if(e === "Ranch") {
      this.renderer.setStyle(document.body, 'background-image', "url('./assets/farm-fields-minimal-flat-art-work-style_22350-732.jpg')");
    } 
    if(e === "Pineapple") {
      this.renderer.setStyle(document.body, 'background-image', "url('./assets/Pineapple.jpg')");
    }
    if (e === "Beach") {
      this.renderer.setStyle(document.body, 'background-image', "url('./assets/Beach.jpeg')");
    }
  }

}
